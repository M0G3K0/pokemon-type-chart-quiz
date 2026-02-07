/**
 * Stylelint設定ファイル（Single Source of Truth）
 *
 * ガードレールのルールを統合:
 * - guards/design/rules/design-consistency.rules.js
 * - guards/design/rules/token-naming.rules.js
 *   - baseRules: 全SCSS向け（Tier 1 禁止）
 *   - componentOverrides: src/app/ui/ 向け（Tier 3 のみ許可）
 *
 * @see guards/design/guard/design-consistency.guard.md
 * @see guards/design/guard/token-naming.guard.md
 */

const designConsistencyRules = require('./guards/design/rules/design-consistency.rules.js');
const tokenNamingRules = require('./guards/design/rules/token-naming.rules.js');

module.exports = {
	extends: ['stylelint-config-standard-scss'],
	rules: {
		// === ガードレールから統合されたルール ===
		...designConsistencyRules,
		...tokenNamingRules.baseRules,

		// === SCSS固有の設定 ===
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['theme', 'layer', 'apply', 'tailwind'],
			},
		],
		'at-rule-no-unknown': null,
		'no-descending-specificity': null,
	},

	// === 例外設定 ===
	overrides: [
		{
			// トークン定義ファイル（@themeブロック）ではハードコードを許可
			files: ['src/styles.scss', 'src/styles/**/*.scss'],
			rules: {
				'color-no-hex': null,
				'color-named': null,
				'function-disallowed-list': null,
				'declaration-property-value-disallowed-list': null,
			},
		},
		{
			// コンポーネントSCSSではTier3トークンのみ許可
			files: ['src/app/ui/**/*.scss'],
			rules: {
				...tokenNamingRules.componentOverrides,
			},
		},
	],
};
