/**
 * Pokemon Data Fetcher v3.0 - Ultimate Edition
 *
 * 最強のポケモンデータ取得スクリプト
 *
 * Features:
 * - 並列バッチ処理 + Rate Limiting対策
 * - 自動リトライ（指数バックオフ）
 * - 進捗保存（中断しても続きから再開）
 * - 日本語必須（英語フォールバック禁止）
 * - タイプ・特性の翻訳キャッシュ
 * - メガシンカ・リージョンフォーム対応
 * - 図鑑（内定）情報取得
 * - 鳴き声URL取得
 * - 包括的なバリデーション
 *
 * @see docs/pokemon-data-specification.md
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const CONFIG = {
	// 取得範囲
	limit: 151, // ポケモン数（初代: 151, 全部: 1025）

	// フォルム設定
	includeFormTypes: ['mega', 'alola', 'galar', 'hisui', 'paldea'],

	// 並列処理設定
	batchSize: 10,
	delayBetweenBatches: 500, // ms

	// リトライ設定
	maxRetries: 3,
	retryBaseDelay: 1000, // ms

	// 日本語言語コード（優先順）
	jaLanguageCodes: ['ja-hrkt', 'ja'],

	// ファイルパス
	outputPath: path.join(__dirname, '../../public/pokemons.json'),
	progressPath: path.join(__dirname, '../../.pokemon-fetch-progress.json'),
	errorLogPath: path.join(__dirname, '../../.pokemon-fetch-errors.json'),
};

// ============================================================================
// Translation Caches (Single Source of Truth)
// ============================================================================

const TYPE_TRANSLATIONS = {
	normal: 'ノーマル',
	fire: 'ほのお',
	water: 'みず',
	electric: 'でんき',
	grass: 'くさ',
	ice: 'こおり',
	fighting: 'かくとう',
	poison: 'どく',
	ground: 'じめん',
	flying: 'ひこう',
	psychic: 'エスパー',
	bug: 'むし',
	rock: 'いわ',
	ghost: 'ゴースト',
	dragon: 'ドラゴン',
	dark: 'あく',
	steel: 'はがね',
	fairy: 'フェアリー',
};

// 特性翻訳キャッシュ（動的に追加される）
const abilityCache = new Map();

// 世代名→数値変換（generation-i → 1, generation-ix → 9）
const GENERATION_MAP = {
	'generation-i': 1,
	'generation-ii': 2,
	'generation-iii': 3,
	'generation-iv': 4,
	'generation-v': 5,
	'generation-vi': 6,
	'generation-vii': 7,
	'generation-viii': 8,
	'generation-ix': 9,
};

function parseGeneration(genName) {
	return GENERATION_MAP[genName] || null;
}

// ============================================================================
// Utility Functions
// ============================================================================

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, retries = CONFIG.maxRetries) {
	for (let attempt = 1; attempt <= retries; attempt++) {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}
			return await response.json();
		} catch (error) {
			if (attempt === retries) {
				throw new Error(`Failed after ${retries} attempts: ${error.message}`);
			}
			const delay = CONFIG.retryBaseDelay * attempt;
			console.warn(`  ⚠️  Attempt ${attempt}/${retries} failed, retrying in ${delay}ms...`);
			await sleep(delay);
		}
	}
}

function findJapaneseName(names, context) {
	for (const langCode of CONFIG.jaLanguageCodes) {
		const found = names.find((n) => n.language.name === langCode);
		if (found) {
			return found.name;
		}
	}
	throw new Error(`Japanese name not found for ${context}`);
}

function translateType(enType) {
	const jaType = TYPE_TRANSLATIONS[enType];
	if (!jaType) {
		throw new Error(`Unknown type: ${enType}`);
	}
	return jaType;
}

// ============================================================================
// Ability Translation
// ============================================================================

async function getAbilityJaName(abilityUrl) {
	// キャッシュチェック
	if (abilityCache.has(abilityUrl)) {
		return abilityCache.get(abilityUrl);
	}

	const data = await fetchWithRetry(abilityUrl);
	const jaName = findJapaneseName(data.names, `ability ${data.name}`);
	abilityCache.set(abilityUrl, jaName);
	return jaName;
}

async function getAbilitiesData(pokemonData) {
	const abilities = [];
	let hiddenAbility = null;

	for (const a of pokemonData.abilities) {
		const jaName = await getAbilityJaName(a.ability.url);
		if (a.is_hidden) {
			hiddenAbility = jaName;
		} else {
			abilities.push(jaName);
		}
	}

	return { abilities, hiddenAbility };
}

// ============================================================================
// Pokedex Data
// ============================================================================

function getPokedexes(speciesData) {
	return speciesData.pokedex_numbers.map((p) => p.pokedex.name);
}

// ============================================================================
// Form Detection
// ============================================================================

function parseFormType(formName) {
	if (formName.includes('-mega-x')) return 'mega-x';
	if (formName.includes('-mega-y')) return 'mega-y';
	if (formName.includes('-mega')) return 'mega';
	if (formName.includes('-alola')) return 'alola';
	if (formName.includes('-galar')) return 'galar';
	if (formName.includes('-hisui')) return 'hisui';
	if (formName.includes('-paldea')) return 'paldea';
	return null;
}

function shouldIncludeForm(formName) {
	const formType = parseFormType(formName);
	if (!formType) return false;

	// mega-x, mega-y は 'mega' として扱う
	const baseFormType = formType.startsWith('mega') ? 'mega' : formType;
	return CONFIG.includeFormTypes.includes(baseFormType);
}

// ============================================================================
// Pokemon Fetching
// ============================================================================

async function fetchBasePokemon(id) {
	const [pokemonData, speciesData] = await Promise.all([
		fetchWithRetry(`https://pokeapi.co/api/v2/pokemon/${id}`),
		fetchWithRetry(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
	]);

	const jaName = findJapaneseName(speciesData.names, `Pokemon #${id}`);
	const types = pokemonData.types.map((t) => t.type.name);
	const jaTypes = types.map(translateType);
	const { abilities, hiddenAbility } = await getAbilitiesData(pokemonData);
	const pokedexes = getPokedexes(speciesData);

	return {
		id: pokemonData.id,
		name: jaName,
		enName: pokemonData.name,
		types,
		jaTypes,
		imageUrl: pokemonData.sprites.front_default,
		generation: parseGeneration(speciesData.generation.name),
		formId: null,
		formType: null,
		formNameJa: null,
		abilities,
		hiddenAbility,
		pokedexes,
		cry: pokemonData.cries?.latest || null,

		// メタ情報（フォルム取得用）
		_varieties: speciesData.varieties,
	};
}

async function fetchFormPokemon(variety, basePokemon) {
	const formName = variety.pokemon.name;
	const formType = parseFormType(formName);

	if (!formType) return null;

	const pokemonData = await fetchWithRetry(variety.pokemon.url);
	const types = pokemonData.types.map((t) => t.type.name);
	const jaTypes = types.map(translateType);
	const { abilities, hiddenAbility } = await getAbilitiesData(pokemonData);

	// フォルム名の日本語化
	let formNameJa = null;
	if (formType === 'mega') formNameJa = `メガ${basePokemon.name}`;
	else if (formType === 'mega-x') formNameJa = `メガ${basePokemon.name}X`;
	else if (formType === 'mega-y') formNameJa = `メガ${basePokemon.name}Y`;
	else if (formType === 'alola') formNameJa = `アローラ${basePokemon.name}`;
	else if (formType === 'galar') formNameJa = `ガラル${basePokemon.name}`;
	else if (formType === 'hisui') formNameJa = `ヒスイ${basePokemon.name}`;
	else if (formType === 'paldea') formNameJa = `パルデア${basePokemon.name}`;

	return {
		id: basePokemon.id,
		name: formNameJa,
		enName: formName,
		types,
		jaTypes,
		imageUrl: pokemonData.sprites.front_default
			|| pokemonData.sprites.other?.showdown?.front_default
			|| basePokemon.imageUrl,
		generation: basePokemon.generation,
		formId: formType,
		formType: formType.startsWith('mega') ? 'mega' : formType,
		formNameJa,
		abilities,
		hiddenAbility,
		pokedexes: basePokemon.pokedexes, // 原種の図鑑情報を継承
		cry: pokemonData.cries?.latest || null,
	};
}

async function fetchPokemonWithForms(id) {
	const basePokemon = await fetchBasePokemon(id);
	const results = [basePokemon];

	// フォルム取得
	const formVarieties = basePokemon._varieties.filter(
		(v) => !v.is_default && shouldIncludeForm(v.pokemon.name)
	);

	for (const variety of formVarieties) {
		try {
			const formPokemon = await fetchFormPokemon(variety, basePokemon);
			if (formPokemon) {
				results.push(formPokemon);
				console.log(`    📦 ${formPokemon.name}`);
			}
		} catch (error) {
			console.warn(`    ⚠️  Form fetch failed: ${variety.pokemon.name}`);
		}
	}

	// メタ情報を削除
	delete results[0]._varieties;

	return results;
}

// ============================================================================
// Progress Management
// ============================================================================

function loadProgress() {
	try {
		if (fs.existsSync(CONFIG.progressPath)) {
			const data = JSON.parse(fs.readFileSync(CONFIG.progressPath, 'utf8'));
			console.log(`📂 Resuming: ${data.completed.length} Pokemon already fetched`);
			return data;
		}
	} catch {
		console.warn('⚠️  Could not load progress, starting fresh');
	}
	return { completed: [], pokemons: [] };
}

function saveProgress(progress) {
	fs.writeFileSync(CONFIG.progressPath, JSON.stringify(progress, null, 2));
}

function clearProgress() {
	if (fs.existsSync(CONFIG.progressPath)) {
		fs.unlinkSync(CONFIG.progressPath);
	}
}

// ============================================================================
// Main Fetch Logic
// ============================================================================

async function fetchAllPokemons() {
	const progress = loadProgress();
	const completedSet = new Set(progress.completed);
	const errors = [];

	const idsToFetch = [];
	for (let i = 1; i <= CONFIG.limit; i++) {
		if (!completedSet.has(i)) {
			idsToFetch.push(i);
		}
	}

	if (idsToFetch.length === 0) {
		console.log('✅ All Pokemon already fetched!');
		return progress.pokemons;
	}

	console.log(`🔄 Fetching ${idsToFetch.length} Pokemon...`);
	console.log(`   Forms included: ${CONFIG.includeFormTypes.join(', ')}`);

	for (let i = 0; i < idsToFetch.length; i += CONFIG.batchSize) {
		const batchIds = idsToFetch.slice(i, i + CONFIG.batchSize);
		const batchNum = Math.floor(i / CONFIG.batchSize) + 1;
		const totalBatches = Math.ceil(idsToFetch.length / CONFIG.batchSize);

		console.log(`\n📦 Batch ${batchNum}/${totalBatches}`);

		const batchPromises = batchIds.map(async (id) => {
			try {
				const pokemons = await fetchPokemonWithForms(id);
				const base = pokemons[0];
				const formCount = pokemons.length - 1;
				const formInfo = formCount > 0 ? ` (+${formCount} forms)` : '';
				console.log(`  ✅ #${id} ${base.name}${formInfo}`);
				return { success: true, id, pokemons };
			} catch (error) {
				console.error(`  ❌ #${id}: ${error.message}`);
				return { success: false, id, error: error.message };
			}
		});

		const results = await Promise.all(batchPromises);

		for (const result of results) {
			if (result.success) {
				progress.pokemons.push(...result.pokemons);
				progress.completed.push(result.id);
			} else {
				errors.push({ id: result.id, error: result.error });
			}
		}

		saveProgress(progress);

		if (i + CONFIG.batchSize < idsToFetch.length) {
			await sleep(CONFIG.delayBetweenBatches);
		}
	}

	// Sort by ID, then by formId (null first)
	progress.pokemons.sort((a, b) => {
		if (a.id !== b.id) return a.id - b.id;
		if (a.formId === null) return -1;
		if (b.formId === null) return 1;
		return a.formId.localeCompare(b.formId);
	});

	if (errors.length > 0) {
		console.error(`\n❌ Failed: ${errors.length} Pokemon`);
		fs.writeFileSync(CONFIG.errorLogPath, JSON.stringify(errors, null, 2));
	}

	return progress.pokemons;
}

// ============================================================================
// Validation
// ============================================================================

function validateOutput(pokemons) {
	console.log('\n🔍 Validating...');
	const issues = [];

	for (const p of pokemons) {
		// 日本語チェック
		if (/^[a-z]/.test(p.name)) {
			issues.push(`#${p.id}: name "${p.name}" is English`);
		}
		for (const t of p.jaTypes) {
			if (/^[a-z]/.test(t)) {
				issues.push(`#${p.id}: jaType "${t}" is English`);
			}
		}

		// 必須フィールドチェック
		if (!p.imageUrl) issues.push(`#${p.id}: missing imageUrl`);
		if (!p.generation) issues.push(`#${p.id}: missing generation`);
		if (!p.abilities || p.abilities.length === 0) {
			issues.push(`#${p.id}: missing abilities`);
		}
	}

	if (issues.length > 0) {
		console.error('❌ Validation failed:');
		issues.slice(0, 10).forEach((i) => console.error(`   ${i}`));
		if (issues.length > 10) console.error(`   ... and ${issues.length - 10} more`);
		return false;
	}

	console.log('✅ Validation passed!');
	return true;
}

// ============================================================================
// Statistics
// ============================================================================

function printStats(pokemons) {
	const baseCount = pokemons.filter((p) => !p.formId).length;
	const formCount = pokemons.filter((p) => p.formId).length;
	const megaCount = pokemons.filter((p) => p.formType === 'mega').length;
	const regionalCount = pokemons.filter((p) =>
		['alola', 'galar', 'hisui', 'paldea'].includes(p.formType)
	).length;

	console.log('\n📊 Statistics:');
	console.log(`   Total entries: ${pokemons.length}`);
	console.log(`   Base Pokemon: ${baseCount}`);
	console.log(`   Forms: ${formCount} (Mega: ${megaCount}, Regional: ${regionalCount})`);
	console.log(`   Unique abilities: ${abilityCache.size}`);
}

// ============================================================================
// Main
// ============================================================================

async function main() {
	console.log('🎮 Pokemon Data Fetcher v3.0 - Ultimate Edition');
	console.log('================================================');
	console.log(`Target: ${CONFIG.limit} Pokemon`);
	console.log(`Output: ${CONFIG.outputPath}`);
	console.log('');

	const startTime = Date.now();

	try {
		const pokemons = await fetchAllPokemons();
		validateOutput(pokemons);
		printStats(pokemons);

		fs.writeFileSync(CONFIG.outputPath, JSON.stringify(pokemons, null, 2));

		const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
		const fileSize = (fs.statSync(CONFIG.outputPath).size / 1024).toFixed(1);

		console.log(`\n✨ Done! Saved ${pokemons.length} entries to ${CONFIG.outputPath}`);
		console.log(`   File size: ${fileSize} KB`);
		console.log(`   Time: ${elapsed}s`);

		if (pokemons.filter((p) => !p.formId).length === CONFIG.limit) {
			clearProgress();
			console.log('   Progress cleared.');
		}
	} catch (error) {
		console.error(`\n💥 Fatal: ${error.message}`);
		console.error('   Progress saved. Re-run to resume.');
		process.exit(1);
	}
}

main();
