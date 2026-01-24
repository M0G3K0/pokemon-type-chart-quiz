const { REQUIRED_SECTIONS } = require("../guards/process/rules/issue-format.rules");

const issueBody = process.env.ISSUE_BODY || "";
const issueTitle = process.env.ISSUE_TITLE || "";

console.log(`🛡️ Validating Issue: "${issueTitle}"`);
console.log(`   - Checking required sections...`);

const missingSections = [];
for (const section of REQUIRED_SECTIONS) {
	if (!issueBody.includes(section)) {
		missingSections.push(section);
	}
}

if (missingSections.length > 0) {
	console.error("\n❌ Issue validation failed!");
	console.error("   Missing sections:");
	missingSections.forEach((section) => console.error(`   - ${section}`));
	console.log("\nSee: guards/process/guard/issue-format.guard.md");

	// Output for GitHub Actions to use in comment
	const commentBody = `⚠️ **このIssueはテンプレートの必須項目が不足しています**

**不足しているセクション**:
${missingSections.map(s => `- ${s}`).join('\n')}

テンプレートに従って本文を編集してください。
修正後、このチェックは自動的に再実行されます。

参照: \`guards/process/guard/issue-format.guard.md\``;

	console.log("\n--- COMMENT_BODY ---");
	console.log(commentBody);
	console.log("--- END_COMMENT_BODY ---");

	process.exit(1);
}

console.log("✅ Issue validation successful!");
process.exit(0);
