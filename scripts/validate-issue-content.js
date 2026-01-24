const {
	BUG_REPORT_SECTIONS,
	FEATURE_REQUEST_SECTIONS,
	REFACTOR_TASK_SECTIONS,
} = require("../guards/process/rules/issue-format.rules");

const issueBody = process.env.ISSUE_BODY || "";
const issueTitle = process.env.ISSUE_TITLE || "";
const issueLabels = process.env.ISSUE_LABELS || "";

console.log(`🛡️ Validating Issue: "${issueTitle}"`);

/**
 * Determine which template is being used based on labels or title
 */
let requiredSections = [];
let templateType = "unknown";

if (issueLabels.includes("bug") || issueTitle.includes("🐛") || issueTitle.toLowerCase().includes("fix:")) {
	requiredSections = BUG_REPORT_SECTIONS;
	templateType = "Bug Report";
} else if (issueLabels.includes("enhancement") || issueTitle.includes("✨") || issueTitle.toLowerCase().includes("feat:")) {
	requiredSections = FEATURE_REQUEST_SECTIONS;
	templateType = "Feature Request";
} else if (issueLabels.includes("chore") || issueLabels.includes("refactor") || issueTitle.includes("♻️")) {
	requiredSections = REFACTOR_TASK_SECTIONS;
	templateType = "Refactor/Task";
} else {
	console.log("⚠️ Could not determine template type from labels or title. Skipping validation.");
	process.exit(0);
}

console.log(`   - Detected template: ${templateType}`);
console.log(`   - Checking required sections...`);

const missingSections = [];
for (const section of requiredSections) {
	if (!issueBody.includes(section)) {
		missingSections.push(section);
	}
}

if (missingSections.length > 0) {
	console.error("\n❌ Issue validation failed!");
	console.error(`   Template: ${templateType}`);
	console.error("   Missing sections:");
	missingSections.forEach((section) => console.error(`   - ${section}`));
	console.log("\nSee: guards/process/guard/issue-format.guard.md");

	// Output for GitHub Actions to use in comment
	const commentBody = `⚠️ **このIssueはテンプレートの必須項目が不足しています**

**テンプレート**: ${templateType}

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
