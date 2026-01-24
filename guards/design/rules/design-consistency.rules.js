/**
 * @what  CSS/SCSSの品質とデザインの一貫性を検査するStylelintルール
 * @why   デザインの崩壊を防ぎ、保守性の高いスタイル定義を維持するため
 * @failure  Stylelintエラーとなり、CIが失敗する
 * @guardrail guards/design/guard/design-consistency.guard.md
 */

module.exports = {
	"declaration-no-important": true,
	"selector-max-id": 0,
	"max-nesting-depth": [
		3,
		{
			ignore: ["blockless-at-rules", "pseudo-classes"],
		},
	],
	"property-no-unknown": [
		true,
		{
			ignoreProperties: ["/theme-/", "/content-/"], // AngularやTailwindなどで使う特殊プロパティを除外
		},
	],
	// SCSS特有のルール
	"scss/at-rule-no-unknown": [
		true,
		{
			ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen"], // Tailwind CSS用
		},
	],

	// 色指定の厳格化（デザインシステム強制）
	"color-no-hex": true,
	"color-named": "never",
	"function-disallowed-list": ["rgb", "rgba", "hsl", "hsla"], // 関数での色指定も禁止
};

