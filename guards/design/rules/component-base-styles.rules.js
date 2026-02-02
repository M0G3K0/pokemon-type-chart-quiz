/**
 * @what  :host セレクタ内の直接スタイル定義を検出
 * @why   共通スタイルはMixinで一元管理すべき
 * @failure CIが失敗する
 * @guardrail guards/design/guard/component-base-styles.guard.md
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ガードレールドキュメントへのパス（エラーメッセージ用）
const GUARDRAIL_PATH = 'guards/design/guard/component-base-styles.guard.md';

// 検査対象ディレクトリ
const TARGET_PATTERN = 'src/app/ui/**/*.scss';

// :host 内で禁止するプロパティ
const FORBIDDEN_HOST_PROPERTIES = ['display', 'line-height'];

/**
 * SCSSファイル内の :host セレクタを解析し、禁止プロパティを検出
 * @param {string} content - SCSSファイルの内容
 * @param {string} filePath - ファイルパス（エラーメッセージ用）
 * @returns {Array<{line: number, property: string, message: string}>} - 違反一覧
 */
function checkHostStyles(content, filePath) {
	const violations = [];
	const lines = content.split('\n');

	let insideHost = false;
	let braceCount = 0;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const lineNumber = i + 1;

		// :host セレクタの開始を検出
		if (line.includes(':host') && line.includes('{')) {
			insideHost = true;
			braceCount = 1;
			continue;
		}

		if (line.includes(':host') && !line.includes('{')) {
			// 次の行で { がある可能性
			insideHost = true;
			braceCount = 0;
			continue;
		}

		if (insideHost) {
			// ブレースのカウント
			braceCount += (line.match(/{/g) || []).length;
			braceCount -= (line.match(/}/g) || []).length;

			// :host ブロック内での禁止プロパティチェック
			// @include は許可（Mixin使用）
			if (!line.includes('@include')) {
				for (const prop of FORBIDDEN_HOST_PROPERTIES) {
					// プロパティ定義のパターン: "display:" または "display :"
					const propRegex = new RegExp(`^\\s*${prop}\\s*:`, 'i');
					if (propRegex.test(line)) {
						violations.push({
							line: lineNumber,
							property: prop,
							message: `❌ :host 内で '${prop}' を直接定義しています。代わりに @include base.host-* を使用してください (${GUARDRAIL_PATH})`,
						});
					}
				}
			}

			// :host ブロック終了
			if (braceCount <= 0) {
				insideHost = false;
			}
		}
	}

	return violations;
}

/**
 * 全コンポーネントSCSSファイルを検査
 * @returns {boolean} - 違反がなければ true
 */
function validateAll() {
	const files = glob.sync(TARGET_PATTERN);
	let hasViolations = false;

	for (const file of files) {
		const content = fs.readFileSync(file, 'utf-8');
		const violations = checkHostStyles(content, file);

		if (violations.length > 0) {
			hasViolations = true;
			console.error(`\n${file}:`);
			for (const v of violations) {
				console.error(`  Line ${v.line}: ${v.message}`);
			}
		}
	}

	if (hasViolations) {
		console.error(`\n📖 ガードレール参照: ${GUARDRAIL_PATH}\n`);
		return false;
	}

	console.log('✅ component-base-styles: 全コンポーネントが正しいパターンを使用しています');
	return true;
}

// CLI実行時
if (require.main === module) {
	const success = validateAll();
	process.exit(success ? 0 : 1);
}

module.exports = {
	GUARDRAIL_PATH,
	TARGET_PATTERN,
	FORBIDDEN_HOST_PROPERTIES,
	checkHostStyles,
	validateAll,
};
