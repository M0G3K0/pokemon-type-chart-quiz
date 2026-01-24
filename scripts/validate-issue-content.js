const { REQUIRED_SECTIONS, GUARDRAIL_PATH } = require("../guards/process/rules/issue-format.rules");

const issueBody = process.env.ISSUE_BODY || "";
const issueTitle = process.env.ISSUE_TITLE || "";

// GitHub Actions では GitHub URL形式でリンクがクリック可能
const isCI = process.env.CI === "true";
const guardrailLink = isCI
	? `https://github.com/${process.env.GITHUB_REPOSITORY}/blob/main/${GUARDRAIL_PATH}`
	: GUARDRAIL_PATH;

console.log(`🛡️ Validating Issue: "${issueTitle}"`);
console.log(`   - Checking required sections...`);

const missingSections = [];
for (const section of REQUIRED_SECTIONS) {
	if (!issueBody.includes(section)) {
		missingSections.push(section);
	}
}

if (missingSections.length > 0) {
	console.error("\n❌ Issue validation failed!\n");

	console.error("━━━ エラー: issue-body-sections ━━━");
	console.error(`   ${missingSections.length}個の必須セクションが不足しています`);
	missingSections.forEach((section) => console.error(`   - ${section}`));
	console.error(`\n   💡 ヒント: テンプレートを確認: .github/ISSUE_TEMPLATE/task.md`);
	console.error("");

	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
	console.log(`📖 ガードレール: ${guardrailLink}`);
	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

	// Output for GitHub Actions to use in comment
	const commentBody = `⚠️ **このIssueはテンプレートの必須項目が不足しています**

**不足しているセクション**:
${missingSections.map(s => `- ${s}`).join('\n')}

テンプレートに従って本文を編集してください。
修正後、このチェックは自動的に再実行されます。

📖 参照: \`${GUARDRAIL_PATH}\``;

	console.log("\n--- COMMENT_BODY ---");
	console.log(commentBody);
	console.log("--- END_COMMENT_BODY ---");

	process.exit(1);
}

console.log("✅ Issue validation successful!");
process.exit(0);
