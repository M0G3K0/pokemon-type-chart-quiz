/**
 * @what  pt-*コンポーネントの必須ファイル（ts/spec.ts）の存在を検査
 * @why   ファイル不足によるテスト欠落や保守性低下を防ぐため
 * @failure  必須ファイルが不足している場合、プロセスは非0で終了する
 * @guardrail guards/code-quality/guard/component-structure.guard.md
 */

const fs = require("fs");
const path = require("path");

const GUARDRAIL_PATH = "guards/code-quality/guard/component-structure.guard.md";

// 探索対象のルートディレクトリ
const UI_DIR = path.join(__dirname, "../../../src/app/ui");

// pt-*コンポーネントに必須のファイル拡張子
// .ts と .spec.ts は必須、.scss と .html はインラインで定義可能なため任意
const REQUIRED_EXTENSIONS = [".ts", ".spec.ts"];

/**
 * pt-*ディレクトリを取得
 */
function getPtComponentDirs() {
	if (!fs.existsSync(UI_DIR)) {
		console.warn(`⚠️  UI directory not found: ${UI_DIR}`);
		return [];
	}

	return fs
		.readdirSync(UI_DIR)
		.filter((name) => name.startsWith("pt-"))
		.map((name) => ({
			name,
			path: path.join(UI_DIR, name),
		}))
		.filter((dir) => fs.statSync(dir.path).isDirectory());
}

/**
 * コンポーネントディレクトリの構成をチェック
 */
function checkComponentStructure(componentDir) {
	const errors = [];
	const componentName = componentDir.name;

	REQUIRED_EXTENSIONS.forEach((ext) => {
		const expectedFile = `${componentName}${ext}`;
		const filePath = path.join(componentDir.path, expectedFile);

		if (!fs.existsSync(filePath)) {
			errors.push({
				component: componentName,
				missingFile: expectedFile,
				fullPath: filePath,
			});
		}
	});

	return errors;
}

/**
 * メイン実行関数
 */
function main() {
	console.log("🛡️ Checking component structure completeness...\n");

	const componentDirs = getPtComponentDirs();

	if (componentDirs.length === 0) {
		console.log("ℹ️  No pt-* components found.");
		process.exit(0);
	}

	console.log(`📦 Found ${componentDirs.length} pt-* component(s)\n`);

	let allErrors = [];

	componentDirs.forEach((dir) => {
		const errors = checkComponentStructure(dir);
		allErrors = allErrors.concat(errors);
	});

	if (allErrors.length > 0) {
		console.error("❌ Component structure violations found:\n");

		allErrors.forEach((error) => {
			const relativePath = path.relative(
				process.cwd(),
				path.join(UI_DIR, error.component, error.missingFile)
			);
			console.error(`   Missing: ${relativePath}`);
		});

		console.error(`\n   See: ${GUARDRAIL_PATH}`);
		console.error(`\n❌ Found ${allErrors.length} missing required file(s).`);
		process.exit(1);
	} else {
		console.log("✅ All pt-* components have required files.");
		process.exit(0);
	}
}

if (require.main === module) {
	main();
}

module.exports = { checkComponentStructure, getPtComponentDirs };
