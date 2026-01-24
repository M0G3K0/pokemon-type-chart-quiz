/**
 * @what  開発プロセスにおけるツール使用とワークフローを規定
 * @why   一貫した開発プロセスにより、バグや手戻りを防ぐため
 * @failure  プロセス違反は手動レビューで検出、重大な場合はCIで検出
 * @guardrail guards/process/guard/development-workflow.guard.md
 */

/**
 * 禁止されているPowerShellコマンド
 * これらはファイル内容を書き込む際にエンコーディング問題を起こす
 */
const FORBIDDEN_POWERSHELL_COMMANDS = [
	"Set-Content",
	"Add-Content",
	"Out-File",
	">>", // リダイレクト演算子
];

/**
 * 推奨ツール
 */
const PREFERRED_TOOLS = {
	fileCreation: "AI専用ツール（write_to_file等）",
	fileEdit: "AI専用ツール（replace_file_content等）",
	prCreation: "gh pr create",
	issueCreation: "gh issue create",
};

/**
 * このルールは現状、自動検証ではなくドキュメントとして機能
 * AGENTS.mdに記載され、AIエージェントが参照する
 */
module.exports = {
	FORBIDDEN_POWERSHELL_COMMANDS,
	PREFERRED_TOOLS,
};
