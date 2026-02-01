/**
 * @fileoverview ESLint Flat Config for Pokemon Type Chart Quiz
 * @what コード品質を検証するESLint設定
 * @why 一貫したコード品質を保ち、保守性を高めるため
 * @guardrail guards/code-quality/guard/coding-standards.guard.md
 */
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

// Import custom rules from guards
import codingStandardsRules from "./guards/code-quality/rules/coding-standards.rules.js";
import uiImportStandards from "./guards/architecture/rules/ui-import-standards.rules.js";

export default tseslint.config(
	// Global ignores
	{
		ignores: [
			"node_modules/**",
			"dist/**",
			".angular/**",
			"coverage/**",
			// Generated files
			"src/styles/generated/**",
			"public/data/**",
		],
	},

	// Base configs
	eslint.configs.recommended,
	...tseslint.configs.recommended,

	// TypeScript files configuration
	{
		files: ["src/**/*.ts"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			// Import custom coding standards
			...codingStandardsRules,

			// UI import standards (Issue #89)
			// UIコンポーネントは @ui/component 形式でimportする
			...uiImportStandards.rules,

			// File size limit (Issue #31)
			// ファイルが大きすぎると保守性が低下するため制限
			"max-lines": [
				"error",
				{
					max: 300,
					skipBlankLines: true,
					skipComments: true,
				},
			],
		},
	},

	// Relaxed rules for test files
	{
		files: ["**/*.spec.ts"],
		rules: {
			"@typescript-eslint/no-magic-numbers": "off",
			"max-lines": "off",
		},
	},

	// Relaxed rules for design token / style files
	{
		files: ["src/design-system/**", "src/styles/**"],
		rules: {
			"@typescript-eslint/no-magic-numbers": "off",
			"max-lines": "off",
		},
	},

	// Relaxed rules for domain logic (type effectiveness multipliers: 0.25, 0.5, 2, 4)
	{
		files: ["src/app/domain/**", "src/app/features/**"],
		rules: {
			"@typescript-eslint/no-magic-numbers": "off",
		},
	},

	// Relaxed rules for config/script files
	{
		files: ["*.config.ts", "*.config.mjs", "*.config.js", "scripts/**"],
		rules: {
			"@typescript-eslint/no-require-imports": "off",
			"max-lines": "off",
		},
	}
);
