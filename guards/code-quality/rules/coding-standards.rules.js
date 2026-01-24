/**
 * @what  コード品質に関するESLintルール定義
 * @why   曖昧さを排除し、可読性と保守性を高めるため
 * @failure  Lintエラーとなり、CIが失敗する
 * @guardrail guards/code-quality/guard/coding-standards.guard.md
 */

/** @type {import("eslint").Linter.RulesRecord} */
module.exports = {
	// マジックナンバー禁止
	// 0, 1, -1 は頻出するため許容
	"@typescript-eslint/no-magic-numbers": [
		"error",
		{
			ignore: [0, 1, -1],
			ignoreEnums: true,
			ignoreReadonlyClassProperties: true,
			ignoreNumericLiteralTypes: true,
		},
	],

	// 未使用変数の禁止
	// _で始まる変数は許容（例: _unused）
	"@typescript-eslint/no-unused-vars": [
		"error",
		{
			argsIgnorePattern: "^_",
			varsIgnorePattern: "^_",
			caughtErrorsIgnorePattern: "^_",
		},
	],

	// console.log 禁止（warn）
	// error, warn, info は許容
	"no-console": ["warn", { allow: ["warn", "error", "info"] }],

	// 明示的な可視性修飾子を強制（public/private/protected）
	// これにより「意図しない公開」を防ぐ
	"@typescript-eslint/explicit-member-accessibility": [
		"error",
		{
			accessibility: "no-public", // publicは省略（TypeScript標準）
			overrides: {
				parameterProperties: "explicit",
			},
		},
	],
};
