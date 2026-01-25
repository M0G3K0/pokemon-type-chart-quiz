/** @type {import('knip').KnipConfig} */
module.exports = {
	ignore: [
		'src/**/*.spec.ts',
		'guards/**/*',
		'src/app/domain/type-chart.ts',
		'scripts/download-icons.js',
		// TODO: Remove when first component imports tokens (see Issue #34)
		'src/design-system/tokens/**/*',
		'src/styles/generated/**/*',
	],
	ignoreDependencies: [
		'@testing-library/angular',
		'@testing-library/dom',
		'@testing-library/user-event',
	],
};
