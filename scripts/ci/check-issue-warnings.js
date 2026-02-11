/**
 * Issue作成後にGitHub Actionsの警告コメントを確認するスクリプト
 * 
 * 使い方:
 *   node scripts/check-issue-warnings.js <issue-number>
 * 
 * 例:
 *   node scripts/check-issue-warnings.js 18
 * 
 * GitHub Actionsがテンプレート違反を検出すると、botがIssueにコメントを投稿します。
 * このスクリプトはそのコメントの有無を確認し、警告があれば表示します。
 */

const { execSync } = require('child_process');

const issueNumber = process.argv[2];

if (!issueNumber) {
	console.error('❌ Issue番号を指定してください');
	console.log('   使い方: node scripts/check-issue-warnings.js <issue-number>');
	process.exit(1);
}

console.log(`🔍 Issue #${issueNumber} の警告コメントを確認中...`);
console.log('');

try {
	// Issueのコメントを取得
	const result = execSync(
		`gh issue view ${issueNumber} --comments --json comments`,
		{ encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
	);

	const data = JSON.parse(result);
	const comments = data.comments || [];

	// botからの警告コメントを検索
	const warningComments = comments.filter(comment => {
		const body = comment.body || '';
		return (
			body.includes('テンプレートの必須項目が不足') ||
			body.includes('Missing mandatory section') ||
			body.includes('⚠️') ||
			comment.author?.login === 'github-actions'
		);
	});

	if (warningComments.length > 0) {
		console.error('⚠️ 警告コメントが見つかりました！');
		console.log('');

		warningComments.forEach((comment, index) => {
			console.log(`--- 警告 ${index + 1} ---`);
			console.log(comment.body);
			console.log('');
		});

		console.log('📌 対応方法:');
		console.log('   1. Issueの本文をテンプレートに従って修正');
		console.log('   2. GitHub上でIssueを編集');
		console.log('   3. または: gh issue edit ' + issueNumber + ' --body-file issue-body.md');
		console.log('');
		console.log('💡 ローカルで事前検証:');
		console.log('   node scripts/validate-issue-local.js');
		process.exit(1);
	}

	console.log('✅ 警告コメントはありません。Issueは正常です。');
	process.exit(0);

} catch (error) {
	console.error('❌ エラーが発生しました:', error.message);
	console.log('   gh CLIがインストールされているか確認してください。');
	process.exit(1);
}
