/** @type {import('knip').KnipConfig} */
module.exports = {
	ignore: [
		'src/**/*.spec.ts',
		'guards/**/*',
		'src/app/domain/type-chart.ts',
		'scripts/download-icons.js',
		'src/design-system/tokens.ts',
		'src/styles/generated/**/*',
	],
	ignoreDependencies: [
		'@testing-library/angular',
		'@testing-library/dom',
		'@testing-library/user-event',
	],
};
