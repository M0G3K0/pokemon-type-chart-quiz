/**
 * @what  ガードレールファイル自体の書式を検査
 * @why   一貫性のある書式により、AIと人間がルールを素早く理解できるようにするため
 * @failure  書式が不正なガードレールはCIでエラーとなる
 * @guardrail guards/meta/guard/guardrail-format.guard.md
 */

const fs = require("fs");
const path = require("path");

const REQUIRED_PATTERNS = [
	{ pattern: /^<!-- 🛡️ GUARDRAIL -->/, name: "識別バッジ" },
	{ pattern: /## @what \/ @why \/ @failure/, name: "@what/@why/@failureセクション" },
	{ pattern: /@what\s+/, name: "@whatアノテーション" },
	{ pattern: /@why\s+/, name: "@whyアノテーション" },
	{ pattern: /@failure\s+/, name: "@failureアノテーション" },
];

/**
 * ガードレールファイルの書式を検証
 * @param {string} filePath - 検証するファイルのパス
 * @returns {{valid: boolean, errors: string[]}}
 */
function validateGuardFile(filePath) {
	const content = fs.readFileSync(filePath, "utf-8");
	const errors = [];

	for (const { pattern, name } of REQUIRED_PATTERNS) {
		if (!pattern.test(content)) {
			errors.push(`Missing: ${name}`);
		}
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}

/**
 * 全ガードレールファイルを検証
 * @param {string} guardsDir - guardsディレクトリのパス
 * @returns {{valid: boolean, results: Object[]}}
 */
function validateAllGuards(guardsDir) {
	const glob = require("glob");
	const files = glob.sync(path.join(guardsDir, "**/guard/*.guard.md"));
	const results = [];
	let allValid = true;

	for (const file of files) {
		const result = validateGuardFile(file);
		results.push({ file, ...result });
		if (!result.valid) {
			allValid = false;
		}
	}

	return { valid: allValid, results };
}

module.exports = {
	validateGuardFile,
	validateAllGuards,
	REQUIRED_PATTERNS,
};

// CLI実行時
if (require.main === module) {
	const guardsDir = path.join(__dirname, "..", "..");

	// globパッケージがない場合は手動でファイルを取得
	const { readdirSync, statSync } = require("fs");

	function findGuardFiles(dir) {
		const files = [];
		const items = readdirSync(dir);

		for (const item of items) {
			const fullPath = path.join(dir, item);
			const stat = statSync(fullPath);

			if (stat.isDirectory()) {
				files.push(...findGuardFiles(fullPath));
			} else if (item.endsWith(".guard.md")) {
				files.push(fullPath);
			}
		}

		return files;
	}

	const guardFiles = findGuardFiles(guardsDir);
	let hasErrors = false;

	console.log("🛡️ Validating guardrail files...\n");

	for (const file of guardFiles) {
		const result = validateGuardFile(file);
		const relativePath = path.relative(guardsDir, file);

		if (result.valid) {
			console.log(`✅ ${relativePath}`);
		} else {
			console.log(`❌ ${relativePath}`);
			for (const error of result.errors) {
				console.log(`   - ${error}`);
			}
			hasErrors = true;
		}
	}

	console.log("");

	if (hasErrors) {
		console.log("❌ Some guardrail files have format errors.");
		process.exit(1);
	} else {
		console.log(`✅ All ${guardFiles.length} guardrail files are valid.`);
		process.exit(0);
	}
}
