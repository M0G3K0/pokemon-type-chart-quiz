/**
 * @what  UIコンポーネントとTier 3トークンの対応関係を検証
 * @why   コンポーネントにトークンがない、またはトークンにコンポーネントがない状態を防ぐ
 * @failure  対応関係に不整合がある場合、警告が表示される
 * @guardrail guards/design/guard/component-token-mapping.guard.md
 */

const fs = require('fs');
const path = require('path');

// ガードレールドキュメントへのパス（エラーメッセージ用）
const GUARDRAIL_PATH = 'guards/design/guard/component-token-mapping.guard.md';

// パス設定
const COMPONENTS_DIR = 'src/app/ui';
const TOKENS_DIR = 'design-tokens/tier3-component';

// 除外リスト（セマンティックラッパーなど）
const EXCLUDED_COMPONENTS = [
	// pt-type-chip は type-chip.json で対応しているので除外しない
];

const EXCLUDED_TOKENS = [
	// 将来的に孤立トークンを許容する場合はここに追加
];

/**
 * コンポーネント名を取得（pt-xxx → xxx）
 */
function getComponentName(dirName) {
	return dirName.replace(/^pt-/, '');
}

/**
 * トークン名を取得（xxx.json → xxx）
 */
function getTokenName(fileName) {
	return fileName.replace(/\.json$/, '');
}

/**
 * コンポーネントとトークンの対応関係をチェック
 */
function checkMapping() {
	const warnings = [];

	// コンポーネント一覧を取得
	const componentsPath = path.resolve(COMPONENTS_DIR);
	const components = fs.readdirSync(componentsPath)
		.filter(name => name.startsWith('pt-') && fs.statSync(path.join(componentsPath, name)).isDirectory())
		.map(getComponentName)
		.filter(name => !EXCLUDED_COMPONENTS.includes(name));

	// トークン一覧を取得
	const tokensPath = path.resolve(TOKENS_DIR);
	const tokens = fs.readdirSync(tokensPath)
		.filter(name => name.endsWith('.json'))
		.map(getTokenName)
		.filter(name => !EXCLUDED_TOKENS.includes(name));

	// RULE-01: コンポーネントにトークンがあるかチェック
	for (const component of components) {
		if (!tokens.includes(component)) {
			warnings.push({
				type: 'missing-token',
				component,
				message: `⚠️  Component 'pt-${component}' has no corresponding token file`,
				suggestion: `Create: ${TOKENS_DIR}/${component}.json`
			});
		}
	}

	// RULE-02: トークンにコンポーネントがあるかチェック
	for (const token of tokens) {
		if (!components.includes(token)) {
			warnings.push({
				type: 'orphan-token',
				token,
				message: `⚠️  Token '${token}.json' has no corresponding component`,
				suggestion: `Either create 'pt-${token}' component or remove ${TOKENS_DIR}/${token}.json`
			});
		}
	}

	return { warnings, components, tokens };
}

module.exports = { checkMapping, GUARDRAIL_PATH };

// CLI実行時
if (require.main === module) {
	console.log('🛡️ Checking component-token mapping...\n');

	const { warnings, components, tokens } = checkMapping();

	console.log(`📦 Found ${components.length} component(s)`);
	console.log(`📄 Found ${tokens.length} token file(s)\n`);

	if (warnings.length === 0) {
		console.log('✅ All components and tokens are properly mapped.');
		process.exit(0);
	} else {
		console.log(`Found ${warnings.length} warning(s):\n`);

		for (const warning of warnings) {
			console.log(warning.message);
			console.log(`   → ${warning.suggestion}`);
			console.log('');
		}

		console.log(`📖 See: ${GUARDRAIL_PATH}`);

		// 不整合があればCIを失敗させる
		process.exit(1);
	}
}
