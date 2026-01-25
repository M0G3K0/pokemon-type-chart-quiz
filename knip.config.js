/** @type {import('knip').KnipConfig} */
module.exports = {
	ignore: [
		'src/**/*.spec.ts',
		'guards/**/*',
		'src/app/domain/type-chart.ts',
		'scripts/download-icons.js',
	],
	ignoreDependencies: [
		'@testing-library/angular',
		'@testing-library/dom',
		'@testing-library/user-event',
	],
};
