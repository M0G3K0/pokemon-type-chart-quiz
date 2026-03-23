/**
 * @what  pt-*コンポーネントが作成標準（ファイル構成、ドキュメント、テスト内容）を満たしているか統合検査
 * @why   コンポーネント品質の一貫性を担保し、新規作成時の抜け漏れを防ぐため
 * @failure  標準を満たさない場合、プロセスは非0で終了する
 * @guardrail guards/code-quality/guard/component-standards.guard.md
 */

const fs = require("fs");
const path = require("path");

const GUARDRAIL_PATH = "guards/code-quality/guard/component-standards.guard.md";

// ディレクトリ定義
const UI_DIR = path.join(__dirname, "../../../src/app/ui");
const DOCS_DIRS = [
	path.join(__dirname, "../../../projects/docs/src/components"),
	path.join(__dirname, "../../../projects/docs/src/poke-sdk"),
];

// テストケースの検出パターン（it, test, it.todo, test.todo を認識）
const TEST_CASE_PATTERN = /\b(it|test)(\.todo)?\s*\(/g;

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
 * 必須ファイルの存在チェック
 */
function checkRequiredFiles(componentDir) {
	const errors = [];
	const componentName = componentDir.name;

	// 必須: .ts と .spec.ts
	const requiredExtensions = [".ts", ".spec.ts"];

	requiredExtensions.forEach((ext) => {
		const expectedFile = `${componentName}${ext}`;
		const filePath = path.join(componentDir.path, expectedFile);

		if (!fs.existsSync(filePath)) {
			errors.push({
				type: "missing-file",
				component: componentName,
				message: `Missing required file: ${expectedFile}`,
			});
		}
	});

	return errors;
}

/**
 * ドキュメントの存在チェック（NgDoc）
 * NOTE: NgDoc は orbiter (@m0g3k0/ui) に移行済み。
 * コンポーネントドキュメントは orbiter 側で管理するため、ここではスキップ。
 */
function checkDocumentation(_componentDir) {
	return [];
}

/**
 * テストファイルの内容チェック（最低1つのテストケース）
 */
function checkTestContent(componentDir) {
	const errors = [];
	const componentName = componentDir.name;
	const specPath = path.join(componentDir.path, `${componentName}.spec.ts`);

	if (fs.existsSync(specPath)) {
		const content = fs.readFileSync(specPath, "utf8");
		const matches = content.match(TEST_CASE_PATTERN);

		if (!matches || matches.length === 0) {
			errors.push({
				type: "empty-test",
				component: componentName,
				message: `No test cases found in: ${componentName}.spec.ts`,
			});
		}
	}

	return errors;
}

/**
 * メイン実行関数
 */
function main() {
	console.log("🛡️ Checking component creation standards...\n");

	const componentDirs = getPtComponentDirs();

	if (componentDirs.length === 0) {
		console.log("ℹ️  No pt-* components found.");
		process.exit(0);
	}

	console.log(`📦 Found ${componentDirs.length} pt-* component(s)\n`);

	const allErrors = {
		"missing-file": [],
		"missing-doc": [],
		"empty-test": [],
	};

	componentDirs.forEach((dir) => {
		// ファイル構成チェック
		checkRequiredFiles(dir).forEach((e) => allErrors["missing-file"].push(e));

		// ドキュメントチェック
		checkDocumentation(dir).forEach((e) => allErrors["missing-doc"].push(e));

		// テスト内容チェック
		checkTestContent(dir).forEach((e) => allErrors["empty-test"].push(e));
	});

	const totalErrors =
		allErrors["missing-file"].length +
		allErrors["missing-doc"].length +
		allErrors["empty-test"].length;

	if (totalErrors > 0) {
		console.error("❌ Component standards violations found:\n");

		if (allErrors["missing-file"].length > 0) {
			console.error("📁 Missing Required Files:");
			allErrors["missing-file"].forEach((e) => {
				console.error(`   - ${e.message}`);
			});
			console.error("");
		}

		if (allErrors["missing-doc"].length > 0) {
			console.error("📄 Missing Documentation:");
			allErrors["missing-doc"].forEach((e) => {
				console.error(`   - ${e.message}`);
			});
			console.error("");
		}

		if (allErrors["empty-test"].length > 0) {
			console.error("🧪 Empty Test Files:");
			allErrors["empty-test"].forEach((e) => {
				console.error(`   - ${e.message}`);
			});
			console.error("");
		}

		console.error(`   See: ${GUARDRAIL_PATH}`);
		console.error(`\n❌ Found ${totalErrors} violation(s).`);
		process.exit(1);
	} else {
		console.log("✅ All pt-* components meet creation standards.");
		process.exit(0);
	}
}

if (require.main === module) {
	main();
}

module.exports = { checkRequiredFiles, checkDocumentation, checkTestContent };
