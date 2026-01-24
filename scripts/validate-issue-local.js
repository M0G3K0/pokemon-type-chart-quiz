/**
 * ローカルで issue-body.md を検証するスクリプト
 * 
 * 使い方:
 *   node scripts/validate-issue-local.js [template-type]
 *   
 *   template-type: bug | feature | refactor (デフォルト: タイトルから自動判定)
 * 
 * 例:
 *   node scripts/validate-issue-local.js feature
 */

const fs = require('fs');
const path = require('path');
const {
	BUG_REPORT_SECTIONS,
	FEATURE_REQUEST_SECTIONS,
	REFACTOR_TASK_SECTIONS,
} = require("../guards/process/rules/issue-format.rules");

const ISSUE_BODY_PATH = path.join(process.cwd(), 'issue-body.md');

// ファイル存在チェック
if (!fs.existsSync(ISSUE_BODY_PATH)) {
	console.error("❌ issue-body.md が見つかりません");
	console.log("   ファイルを作成してから再実行してください。");
	process.exit(1);
}

const issueBody = fs.readFileSync(ISSUE_BODY_PATH, 'utf8');

// テンプレートタイプ判定
let templateType = process.argv[2];
let requiredSections = [];

if (!templateType) {
	// タイトル（最初の##行）から自動判定
	const firstHeading = issueBody.match(/^##\s+(.+)/m);
	const content = issueBody.toLowerCase();

	if (content.includes('再現手順') || content.includes('bug') || content.includes('バグ')) {
		templateType = 'bug';
	} else if (content.includes('実装イメージ') || content.includes('feat') || content.includes('機能')) {
		templateType = 'feature';
	} else {
		templateType = 'refactor';
	}
}

switch (templateType) {
	case 'bug':
		requiredSections = BUG_REPORT_SECTIONS;
		break;
	case 'feature':
		requiredSections = FEATURE_REQUEST_SECTIONS;
		break;
	case 'refactor':
	default:
		requiredSections = REFACTOR_TASK_SECTIONS;
		break;
}

console.log(`🛡️ issue-body.md を検証中...`);
console.log(`   テンプレート: ${templateType}`);
console.log('');

// セクションチェック
const missingSections = [];
const foundSections = [];

for (const section of requiredSections) {
	if (issueBody.includes(section)) {
		foundSections.push(section);
	} else {
		missingSections.push(section);
	}
}

// 結果表示
console.log('📋 必須セクション:');
for (const section of requiredSections) {
	const status = missingSections.includes(section) ? '❌' : '✅';
	console.log(`   ${status} ${section}`);
}

console.log('');

if (missingSections.length > 0) {
	console.error('❌ 検証失敗！不足しているセクションがあります。');
	console.log('');
	console.log('💡 ヒント:');
	console.log('   - テンプレートを確認: .github/ISSUE_TEMPLATE/');
	console.log('   - ガードレール: guards/process/guard/issue-format.guard.md');
	console.log('');
	console.log(`   別のテンプレートを指定する場合: node scripts/validate-issue-local.js [bug|feature|refactor]`);
	process.exit(1);
}

console.log('✅ 検証成功！issue-body.md はテンプレートに準拠しています。');
console.log('');
console.log('📌 次のステップ:');
console.log('   gh issue create --body-file issue-body.md --title "YOUR_TITLE" --label "enhancement"');
process.exit(0);
