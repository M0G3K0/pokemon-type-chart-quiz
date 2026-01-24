/** @type {import('knip').KnipConfig} */
module.exports = {
	entry: ['src/main.ts'],
	project: ['src/**/*.ts'],
	ignore: ['src/**/*.spec.ts'],
	ignoreDependencies: [
		'@angular-devkit/build-angular',
		'@angular/cli',
		'@angular/compiler-cli',
		'typescript',
		'eslint-plugin-tailwindcss',
		'lint-staged',
		'@tailwindcss/postcss',
		'postcss',
		'vitest',
	],
};
