/**
 * @what  Issue本文の必須セクションを定義（テンプレート別）
 * @why   各テンプレートに応じた必要情報が揃っていることを保証するため
 * @failure  不足している項目がある場合、Issueに自動コメントが投稿される
 */
const { withGuardrail } = require("../../utils/rule-helper");

// Bug Report Template
const BUG_REPORT_SECTIONS = [
	"## 💡 概要",
	"## 📝 再現手順",
	"## 📌 期待される挙動",
];

// Feature Request Template
const FEATURE_REQUEST_SECTIONS = [
	"## 💡 概要",
	"## 📝 実装イメージ",
	"## ✅ やることリスト",
];

// Refactor/Task Template
const REFACTOR_TASK_SECTIONS = [
	"## 💡 概要",
	"## ✅ やることリスト",
];

module.exports = {
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
