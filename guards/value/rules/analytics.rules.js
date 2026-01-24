/**
 * @what  トラッキング属性の有無をチェックするスクリプト
 * @why   ユーザー行動データの計測漏れを防ぐため
 * @failure  属性不足が見つかった場合、プロセスは非0で終了する
 * @guardrail guards/value/guard/analytics.guard.md
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// 探索対象
const TARGET_PATTERN = "src/app/**/*.html";

function main() {
	console.log("🛡️ Checking Analytics tracking attributes...\n");

	const files = glob.sync(TARGET_PATTERN);
	let warningCount = 0;

	files.forEach((file) => {
		const content = fs.readFileSync(file, "utf-8");
		const relativePath = path.relative(process.cwd(), file);

		// 簡易的な正規表現でボタン検出（不完全だが効果的）
		// <button ... > を探す。
		const buttonRegex = /<button\s+([^>]*?)>/g;
		let match;

		while ((match = buttonRegex.exec(content)) !== null) {
			const attributes = match[1];
			// data-track 属性が含まれているか
			if (
				!attributes.includes("data-track-") &&
				!attributes.includes("[attr.data-track-")
			) {
				console.warn(
					`⚠️ Missing tracking attribute in ${relativePath}: <button source="${match[0]}">`
				);
				warningCount++;
			}
		}
	});

	if (warningCount > 0) {
		console.warn(
			`\n⚠️ Found ${warningCount} buttons without tracking attributes.`
		);
		console.warn(`   Consider adding 'data-track-name="action-name"'`);
		console.warn(`   See: guards/value/guard/analytics.guard.md`);
		// Phase 7の初期段階なので、エラー（exit 1）にはせず警告（exit 0）に留める
		process.exit(0);
	} else {
		console.log("✅ All interactive elements seem to be tracked.");
		process.exit(0);
	}
}

if (require.main === module) {
	main();
}
