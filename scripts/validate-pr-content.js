const { REQUIRED_SECTIONS } = require("../guards/process/rules/pr-format.rules");

const prBody = process.env.PR_BODY || "";
const prTitle = process.env.PR_TITLE || "";
const errors = [];

console.log(`🛡️ Validating PR: "${prTitle}"`);

/**
 * 1. PR Title Validation
 * Format: "[emoji (optional)] type: description"
 * e.g., "✨ feat: implement something" or "feat: implement something"
 */
console.log("   - Checking title format...");

// Emoji is optional: match with or without emoji prefix
// Pattern: (optional emoji + space) + type + ": " + description (lowercase start)
const typeMatch = prTitle.match(/^(?:[^\x00-\x7F]+\s+)?(feat|fix|docs|style|refactor|perf|test|build|ci|chore): [a-z0-9].+$/);

if (!typeMatch) {
	errors.push(`PR Title "${prTitle}" is invalid.
    Correct format: "[emoji] type: description" (emoji is optional)
    Example: "feat: add new feature" or "✨ feat: add new feature"
    Allowed types: feat, fix, docs, style, refactor, perf, test, build, ci, chore`);
}

/**
 * 2. PR Body Validation
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
