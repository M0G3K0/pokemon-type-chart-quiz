/**
 * @what  テンプレート内での生 Tailwind クラス使用を検出
 * @why   Design System First - UI は pt-* コンポーネントを通じて表現すべき
 * @failure  CI失敗、PRマージ不可
 * @guardrail guards/design/guard/no-raw-tailwind.guard.md
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// ガードレールドキュメントへのパス（エラーメッセージ用）
const GUARDRAIL_PATH = 'guards/design/guard/no-raw-tailwind.guard.md';

// 禁止する Tailwind パターン
const FORBIDDEN_PATTERNS = [
	// Typography
	/\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/,
	/\bfont-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/,
	/\btracking-(tighter|tight|normal|wide|wider|widest)\b/,
	/\bleading-(none|tight|snug|normal|relaxed|loose|\d+)\b/,

	// Color (text/bg with Tailwind color names)
	/\btext-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+\b/,
	/\bbg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d+\b/,

	// Spacing (margin/padding with numeric values)
	/\b[mp][tbrlxy]?-\d+\b/,
	/\b[mp][tbrlxy]?-px\b/,
	/\bgap-\d+\b/,
	/\bspace-[xy]-\d+\b/,

	// Sizing
	/\b[wh]-\d+\b/,
	/\bmin-[wh]-\d+\b/,
	/\bmax-[wh]-\d+\b/,
];

// 除外パターン（許可されるファイル）
const EXCLUDED_PATTERNS = [
	'**/node_modules/**',
	'**/dist/**',
	'**/styles/generated/**',
	'**/src/styles.scss',  // Tailwind import は許可
];

/**
 * ファイル内の Tailwind クラスを検出
 * @param {string} content - ファイル内容
 * @param {string} filePath - ファイルパス
 * @returns {Array} 違反リスト
 */
function findViolations(content, filePath) {
	const violations = [];
	const lines = content.split('\n');

	lines.forEach((line, index) => {
		// class="" 内を検査
		const classMatches = line.match(/class="([^"]*)"/g);
		if (classMatches) {
			classMatches.forEach(match => {
				const classValue = match.replace(/class="([^"]*)"/, '$1');
				FORBIDDEN_PATTERNS.forEach(pattern => {
					const patternMatch = classValue.match(pattern);
					if (patternMatch) {
						violations.push({
							file: filePath,
							line: index + 1,
							match: patternMatch[0],
							context: line.trim().substring(0, 100),
						});
					}
				});
			});
		}
	});

	return violations;
}

/**
 * メイン検証関数
 * @returns {boolean} 検証成功なら true
 */
function validate() {
	console.log('🛡️ Tailwind クラス使用チェック中...\n');

	const files = glob.sync('src/app/**/*.{html,ts}', {
		ignore: EXCLUDED_PATTERNS,
		cwd: process.cwd(),
	});

	let allViolations = [];

	files.forEach(file => {
		const content = fs.readFileSync(file, 'utf-8');
		const violations = findViolations(content, file);
		allViolations = allViolations.concat(violations);
	});

	if (allViolations.length > 0) {
		console.error(`❌ ${allViolations.length} 件の Tailwind クラス使用を検出:\n`);

		allViolations.forEach(v => {
			console.error(`  ${v.file}:${v.line}`);
			console.error(`    違反: "${v.match}"`);
			console.error(`    行: ${v.context}`);
			console.error('');
		});

		console.error(`📖 修正方法: ${GUARDRAIL_PATH}\n`);
		return false;
	}

	console.log('✅ Tailwind クラス使用なし\n');
	return true;
}

// CLI として実行された場合
if (require.main === module) {
	const success = validate();
	process.exit(success ? 0 : 1);
}

module.exports = { validate, findViolations, FORBIDDEN_PATTERNS };
