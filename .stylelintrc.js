/**
 * Stylelint設定ファイル
 *
 * ガードレールのルールを統合:
 * - guards/design/rules/design-consistency.rules.js
 *
 * @see guards/design/guard/design-consistency.guard.md
 */

const designConsistencyRules = require('./guards/design/rules/design-consistency.rules.js');

module.exports = {
	extends: ['stylelint-config-standard'],
	rules: {
		// === ガードレールから統合されたルール ===
		...designConsistencyRules,

		// === プロジェクト固有の設定 ===
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'theme', 'layer'],
			},
		],
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
			},
		},
	],
};
