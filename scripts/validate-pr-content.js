const { REQUIRED_SECTIONS } = require("../guards/process/rules/pr-format.rules");

const prBody = process.env.PR_BODY || "";
const errors = [];

console.log("🛡️ Checking PR content against template requirements...");

for (const section of REQUIRED_SECTIONS) {
	if (!prBody.includes(section)) {
		errors.push(`Missing mandatory section: ${section}`);
	}
}

if (errors.length > 0) {
	console.error("\n❌ PR content validation failed!");
	errors.forEach((err) => console.error(`   - ${err}`));
	console.log("\nSee: guards/process/guard/pr-format.guard.md");
	process.exit(1);
}

console.log("✅ All mandatory PR sections are present.");
process.exit(0);
