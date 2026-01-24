const { execSync } = require("child_process");

const MAX_FILES = 30;

try {
	// ステージングされたファイルリストを取得
	const diff = execSync("git diff --cached --name-only", { encoding: "utf-8" });
	const files = diff.split("\n").filter(Boolean);

	if (files.length > MAX_FILES) {
		console.warn(`\n⚠️  WARNING: You are committing ${files.length} files at once.`);
		console.warn(`   Ideally, keep commits small and focused (Guardrails: Process).`);
		console.warn(`   Consider splitting this commit.\n`);
		// エラーにはせず警告に留める（初期段階なので）
		// process.exit(1); 
	}
} catch (error) {
	// gitコマンド失敗時などは無視
}
