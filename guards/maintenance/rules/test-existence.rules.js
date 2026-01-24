/**
 * @what  テストファイルの存在をチェックするスクリプト
 * @why   主要なファイルに対するテストの欠落を防ぐため
 * @failure  欠落がある場合、プロセスは非0で終了する
 * @guardrail guards/maintenance/guard/test-existence.guard.md
 */

const fs = require("fs");
const path = require("path");

// 探索対象のルートディレクトリ
const SRC_DIR = path.join(__dirname, "../../../src/app");

// 対象となるファイルの拡張子パターン
const TARGET_PATTERNS = [
	".component.ts",
	".service.ts",
	// ".pipe.ts",
	// ".directive.ts"
];

/**
 * ディレクトリを再帰的に探索してファイルを収集
 */
function findFiles(dir, fileList = []) {
	const files = fs.readdirSync(dir);

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			findFiles(filePath, fileList);
		} else {
			fileList.push(filePath);
		}
	});

	return fileList;
}

/**
 * 実行メイン関数
 */
function main() {
	console.log("🛡️ Checking test file existence...\n");

	const allFiles = findFiles(SRC_DIR);
	const targetFiles = allFiles.filter((file) =>
		TARGET_PATTERNS.some((pattern) => file.endsWith(pattern))
	);

	let missingCount = 0;

	targetFiles.forEach((file) => {
		const specFile = file.replace(".ts", ".spec.ts");
		if (!fs.existsSync(specFile)) {
			console.error(`❌ Missing spec file for: ${path.relative(process.cwd(), file)}`);
			// ガードレール参照を出力
			console.error(
				`   See: guards/maintenance/guard/test-existence.guard.md`
			);
			missingCount++;
		}
	});

	if (missingCount > 0) {
		console.error(`\n❌ Found ${missingCount} missing test files.`);
		process.exit(1);
	} else {
		console.log("✅ All target files have corresponding spec files.");
		process.exit(0);
	}
}

if (require.main === module) {
	main();
}
