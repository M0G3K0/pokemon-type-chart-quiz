const { REQUIRED_SECTIONS } = require("../guards/process/rules/pr-format.rules");

const prBody = process.env.PR_BODY || "";
const prTitle = process.env.PR_TITLE || "";
const errors = [];

console.log(`🛡️ Validating PR: "${prTitle}"`);

/**
 * 1. PR Title Validation
 * Must be [emoji] [type]: [description]
 * [type] must be shorthand (feat, fix, etc.)
 * Emoji is mandatory!
 */
console.log("   - Checking title format...");
const titleRegex = /^(?:[\u2700-\u27bf\ud83c\udce0-\ud83c\udfff\ud83d\udc00-\ud83d\udfff\ud83e\udd00-\ud83e\udfff]\s+)(feat|fix|docs|style|refactor|perf|test|build|ci|chore): [a-z0-9].+$/;

if (!titleRegex.test(prTitle)) {
	errors.push(`PR Title "${prTitle}" is invalid.
    Correct format: "✨ [type]: [description]" (Emoji + Space + Type!)
    Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore`);
}

/**
 * 2. PR Body Validation
 * All mandatory sections from pull_request_template.md must exist.
 */
console.log("   - Checking body sections...");
for (const section of REQUIRED_SECTIONS) {
	if (!prBody.includes(section)) {
		errors.push(`Missing mandatory section: ${section}`);
	}
}

if (errors.length > 0) {
	console.error("\n❌ PR validation failed!");
	errors.forEach((err) => console.error(`   - ${err}`));
	console.log("\nSee: guards/process/guard/pr-format.guard.md");
	process.exit(1);
}

console.log("✅ PR validation successful!");
process.exit(0);
