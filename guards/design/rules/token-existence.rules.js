/**
 * @what  SCSSファイル内で使用されているCSS変数（--pt-*）が定義されているか検査
 * @why   トークン名のtypoがビルド時に検出されず、本番で見た目が崩れる問題を防ぐため
 * @failure  未定義トークンがある場合、プロセスは非0で終了する
 * @guardrail guards/design/guard/token-existence.guard.md
 */

const fs = require("fs");
const path = require("path");

const GUARDRAIL_PATH = "guards/design/guard/token-existence.guard.md";

// トークン定義ファイル
const TOKENS_CSS_PATH = path.join(
	__dirname,
	"../../../src/styles/generated/tokens.css"
);

// 検査対象ディレクトリ
const SRC_DIR = path.join(__dirname, "../../../src");

// CSS変数パターン（--pt-で始まるもの）
const TOKEN_USAGE_PATTERN = /var\(\s*(--pt-[a-zA-Z0-9-]+)\s*(?:,\s*[^)]+)?\)/g;

// トークン定義パターン
const TOKEN_DEFINITION_PATTERN = /(--pt-[a-zA-Z0-9-]+)\s*:/g;

/**
 * 定義済みトークンの一覧を取得
 */
function getDefinedTokens() {
	if (!fs.existsSync(TOKENS_CSS_PATH)) {
		console.error(`❌ Token definition file not found: ${TOKENS_CSS_PATH}`);
		process.exit(1);
	}

	const content = fs.readFileSync(TOKENS_CSS_PATH, "utf8");
	const tokens = new Set();

	let match;
	while ((match = TOKEN_DEFINITION_PATTERN.exec(content)) !== null) {
		tokens.add(match[1]);
	}

	return tokens;
}

/**
 * ディレクトリを再帰的に探索してSCSSファイルを収集
 */
function findScssFiles(dir, fileList = []) {
	if (!fs.existsSync(dir)) {
		return fileList;
	}

	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			// node_modulesは除外
			if (file !== "node_modules") {
				findScssFiles(filePath, fileList);
			}
		} else if (file.endsWith(".scss")) {
			fileList.push(filePath);
		}
	});

	return fileList;
}

/**
 * ファイル内で使用されているトークンを抽出
 */
function extractUsedTokens(filePath) {
	const content = fs.readFileSync(filePath, "utf8");
	const lines = content.split("\n");
	const usedTokens = [];

	lines.forEach((line, index) => {
		let match;
		// 正規表現のlastIndexをリセット
		TOKEN_USAGE_PATTERN.lastIndex = 0;
		while ((match = TOKEN_USAGE_PATTERN.exec(line)) !== null) {
			usedTokens.push({
				token: match[1],
				line: index + 1,
				file: filePath,
			});
		}
	});

	return usedTokens;
}

/**
 * 類似トークンを提案
 */
function suggestSimilarToken(undefinedToken, definedTokens) {
	const tokenArray = Array.from(definedTokens);

	// 単純な部分一致で候補を探す
	const baseName = undefinedToken.replace("--pt-", "").replace(/-/g, "");
	const candidates = tokenArray.filter((defined) => {
		const definedBase = defined.replace("--pt-", "").replace(/-/g, "");
		return (
			definedBase.includes(baseName) ||
			baseName.includes(definedBase.slice(0, Math.min(definedBase.length, 10)))
		);
	});

	return candidates.slice(0, 3);
}

/**
 * メイン実行関数
 */
function main() {
	console.log("🛡️ Checking CSS token existence...\n");

	const definedTokens = getDefinedTokens();
	console.log(`📦 Found ${definedTokens.size} defined token(s)\n`);

	const scssFiles = findScssFiles(SRC_DIR);
	console.log(`📂 Scanning ${scssFiles.length} SCSS file(s)\n`);

	const errors = [];

	scssFiles.forEach((file) => {
		const usedTokens = extractUsedTokens(file);

		usedTokens.forEach((usage) => {
			if (!definedTokens.has(usage.token)) {
				errors.push({
					...usage,
					suggestions: suggestSimilarToken(usage.token, definedTokens),
				});
			}
		});
	});

	if (errors.length > 0) {
		console.error("❌ Undefined token references found:\n");

		errors.forEach((error) => {
			const relativePath = path.relative(process.cwd(), error.file);
			console.error(`   Undefined: ${error.token}`);
			console.error(`   Location:  ${relativePath}:${error.line}`);

			if (error.suggestions.length > 0) {
				console.error(`   Did you mean: ${error.suggestions.join(", ")} ?`);
			}

			console.error("");
		});

		console.error(`   See: ${GUARDRAIL_PATH}`);
		console.error(`\n❌ Found ${errors.length} undefined token reference(s).`);
		process.exit(1);
	} else {
		console.log("✅ All CSS token references are valid.");
		process.exit(0);
	}
}

if (require.main === module) {
	main();
}

module.exports = { getDefinedTokens, extractUsedTokens };
