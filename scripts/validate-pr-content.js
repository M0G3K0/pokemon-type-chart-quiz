const { REQUIRED_SECTIONS, GUARDRAIL_PATH } = require("../guards/process/rules/pr-format.rules");

const prBody = process.env.PR_BODY || "";
const prTitle = process.env.PR_TITLE || "";
const errors = [];

// GitHub Actions では file:// 形式でリンクがクリック可能
const isCI = process.env.CI === "true";
const guardrailLink = isCI
	? `https://github.com/${process.env.GITHUB_REPOSITORY}/blob/main/${GUARDRAIL_PATH}`
	: GUARDRAIL_PATH;

console.log(`🛡️ Validating PR: "${prTitle}"`);

/**
 * 1. PR Title Validation
 * Must start with an emoji, followed by a space and a shorthand type.
 * e.g., "✨ feat: implement something"
 */
console.log("   - Checking title format...");

// Simple emoji check: looks for non-ascii characters at the start
const hasEmojiAtStart = /^[^\x00-\x7F]/.test(prTitle);
const typeMatch = prTitle.match(/^(?:[^\x00-\x7F]+\s+)(feat|fix|docs|style|refactor|perf|test|build|ci|chore): [a-z0-9].+$/);

if (!hasEmojiAtStart || !typeMatch) {
	errors.push({
		rule: "pr-title-format",
		message: `PR Title "${prTitle}" is invalid.`,
		hint: `正しい形式: "✨ [type]: [description]"
    - 先頭に絵文字が必須です
    - 許可されたtype: feat, fix, docs, style, refactor, perf, test, build, ci, chore
    - descriptionは英語・小文字で記述`
	});
}

/**
 * 2. PR Body Validation
 */
console.log("   - Checking body sections...");
const missingSections = [];
for (const section of REQUIRED_SECTIONS) {
	if (!prBody.includes(section)) {
		missingSections.push(section);
	}
}

if (missingSections.length > 0) {
	errors.push({
		rule: "pr-body-sections",
		message: `${missingSections.length}個の必須セクションが不足しています`,
		details: missingSections,
		hint: "テンプレートを確認: .github/pull_request_template.md"
	});
}

if (errors.length > 0) {
	console.error("\n❌ PR validation failed!\n");

	errors.forEach((err, i) => {
		console.error(`━━━ エラー ${i + 1}: ${err.rule} ━━━`);
		console.error(`   ${err.message}`);
		if (err.details) {
			err.details.forEach(d => console.error(`   - ${d}`));
		}
		if (err.hint) {
			console.error(`\n   💡 ヒント: ${err.hint}`);
		}
		console.error("");
	});

	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
	console.log(`📖 ガードレール: ${guardrailLink}`);
	console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

	process.exit(1);
}

console.log("✅ PR validation successful!");
process.exit(0);
