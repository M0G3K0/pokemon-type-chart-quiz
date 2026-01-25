/**
 * @what  PR本文の必須セクションを定義
 * @why   テンプレートの項目がすべて含まれていることを保証するため
 * @failure  不足している項目がある場合、CIでエラーを出す
 */
const { withGuardrail } = require("../../utils/rule-helper");

const REQUIRED_SECTIONS = [
	"## 💡 概要",
	"## 📝 変更内容",
	"## 🔗 関連Issue",
	"## 📷 スクリーンショット（該当する場合）",
	"## ✅ チェックリスト",
	"## 📌 補足事項",
	"## 📝 PRタイトルの命名規則:",
	"## 📖 レビュー用語集",
];

const GUARDRAIL_PATH = "guards/process/guard/pr-format.guard.md";

module.exports = {
	REQUIRED_SECTIONS,
	GUARDRAIL_PATH,
	...withGuardrail(GUARDRAIL_PATH, [
		{
			name: "pr-must-contain-all-template-sections",
			comment: "PR template items are mandatory",
		}
	])[0] // Return as a reference object
};
