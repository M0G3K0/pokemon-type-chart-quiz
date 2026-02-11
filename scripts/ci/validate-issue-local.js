/**
 * ローカルで issue-body.md を検証するスクリプト
 * 
 * 使い方:
 *   node scripts/ci/validate-issue-local.js
 * 
 * 必須セクション:
 *   - ## 💡 概要
 *   - ## ✅ やることリスト
 */

const fs = require('fs');
const path = require('path');
const { REQUIRED_SECTIONS, GUARDRAIL_PATH } = require("../guards/process/rules/issue-format.rules");

const ISSUE_BODY_PATH = path.join(process.cwd(), 'issue-body.md');

// ファイル存在チェック
if (!fs.existsSync(ISSUE_BODY_PATH)) {
	console.error("❌ issue-body.md が見つかりません");
	console.log("   ファイルを作成してから再実行してください。");
	process.exit(1);
}

const issueBody = fs.readFileSync(ISSUE_BODY_PATH, 'utf8');

console.log(`🛡️ issue-body.md を検証中...`);
console.log('');

// セクションチェック
const missingSections = [];
const foundSections = [];

for (const section of REQUIRED_SECTIONS) {
	if (issueBody.includes(section)) {
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
	console.log('   - テンプレートを確認: .github/ISSUE_TEMPLATE/task.md');
	console.log(`   - ガードレール: ${GUARDRAIL_PATH}`);
	console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	process.exit(1);
}

console.log('✅ 検証成功！issue-body.md はテンプレートに準拠しています。');
console.log('');
console.log('📌 次のステップ:');
console.log('   gh issue create --body-file issue-body.md --title "YOUR_TITLE"');
process.exit(0);
