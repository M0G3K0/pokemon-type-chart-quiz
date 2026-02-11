/**
 * ローカルで pr-body.md を検証するスクリプト
 * 
 * 使い方:
 *   node scripts/validate-pr-local.js
 * 
 * 必須セクション:
 *   - ## 💡 概要
 *   - ## 📝 変更内容
 *   - ## 🔗 関連Issue
 *   - ## 📷 スクリーンショット（該当する場合）
 *   - ## ✅ チェックリスト
 *   - ## 📌 補足事項
 *   - ## 📝 PRタイトルの命名規則:
 *   - ## 📖 レビュー用語集
 */

const fs = require('fs');
const path = require('path');
const { REQUIRED_SECTIONS, GUARDRAIL_PATH } = require("../guards/process/rules/pr-format.rules");

const PR_BODY_PATH = path.join(process.cwd(), 'pr-body.md');

// ファイル存在チェック
if (!fs.existsSync(PR_BODY_PATH)) {
	console.error("❌ pr-body.md が見つかりません");
	console.log("   ファイルを作成してから再実行してください。");
	process.exit(1);
}

const prBody = fs.readFileSync(PR_BODY_PATH, 'utf8');

console.log(`🛡️ pr-body.md を検証中...`);
console.log('');

// セクションチェック
const missingSections = [];
const foundSections = [];

for (const section of REQUIRED_SECTIONS) {
	if (prBody.includes(section)) {
		foundSections.push(section);
	} else {
		missingSections.push(section);
	}
}

// 結果表示
console.log('📋 必須セクション:');
for (const section of REQUIRED_SECTIONS) {
	const status = missingSections.includes(section) ? '❌' : '✅';
	console.log(`   ${status} ${section}`);
}

console.log('');

if (missingSections.length > 0) {
	console.error('❌ 検証失敗！不足しているセクションがあります。');
	console.log('');
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	console.log('💡 ヒント:');
	console.log('   - テンプレートを確認: .github/pull_request_template.md');
	console.log(`   - ガードレール: ${GUARDRAIL_PATH}`);
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	process.exit(1);
}

console.log('✅ 検証成功！pr-body.md はテンプレートに準拠しています。');
console.log('');
console.log('📌 次のステップ:');
console.log('   gh pr create --body-file pr-body.md --title "YOUR_TITLE"');
process.exit(0);
