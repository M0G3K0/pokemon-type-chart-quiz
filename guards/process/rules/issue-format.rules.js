/**
 * @what  Issue本文の必須セクションを定義（統一テンプレート）
 * @why   どのタイプのIssueでも必要な情報が揃っていることを保証するため
 * @failure  不足している項目がある場合、Issueに自動コメントが投稿される
 */
const { withGuardrail } = require("../../utils/rule-helper");

// 統一テンプレート: すべてのIssueで必須のセクション
const REQUIRED_SECTIONS = [
	"## 💡 概要",
	"## ✅ やることリスト",
];

// 後方互換性のため、旧テンプレート定義も残す（非推奨）
// これらは将来のバージョンで削除される可能性があります
const BUG_REPORT_SECTIONS = REQUIRED_SECTIONS;
const FEATURE_REQUEST_SECTIONS = REQUIRED_SECTIONS;
const REFACTOR_TASK_SECTIONS = REQUIRED_SECTIONS;

module.exports = {
	REQUIRED_SECTIONS,
	// 後方互換性
	BUG_REPORT_SECTIONS,
	FEATURE_REQUEST_SECTIONS,
	REFACTOR_TASK_SECTIONS,
	...withGuardrail("guards/process/guard/issue-format.guard.md", [
		{
			name: "issue-must-contain-template-sections",
			comment: "Issue template items are mandatory",
		}
	])[0]
};
