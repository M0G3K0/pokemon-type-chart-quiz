/**
 * @what  Knip（デッドコード検出）の設定ルール
 * @why   デッドコードを排除し、コードベースを軽量に保つため
 * @failure  Knipエラーとなり、CIでの警告または失敗となる
 * @guardrail guards/maintenance/guard/cleanliness.guard.md
 */

/** @type {import('knip').KnipConfig} */
module.exports = {
	// エントリーポイント（ここから依存関係を辿る）
	entry: [
		"src/main.ts",
		"eslint.config.js",
		"knip.config.js",
		".dependency-cruiser.js",
		".stylelintrc.js",
		"guards/**/*.js", // ガードレールのルールファイル
	],

	// 解析対象プロジェクトファイル
	project: ["src/**/*.ts"],

	// 無視するファイル
	ignore: ["**/*.spec.ts"], // テストファイルは一旦除外（厳密にやるなら含めるべきだが誤検知多いため）

	// 無視する依存関係（ツール系などコードから直接importしないもの）
	ignoreDependencies: [
		// Angularビルド系
		"@angular-devkit/build-angular",
		"@angular/compiler-cli",
		"@angular/cli",
		"typescript",
		"ts-node",
		// Lint/Test系
		"eslint",
		"stylelint",
		"stylelint-config-standard-scss",
		"jasmine-core",
		"karma",
		"karma-chrome-launcher",
		"karma-coverage",
		"karma-jasmine",
		"karma-jasmine-html-reporter",
		"lint-staged",
		"husky",
		"autoprefixer",
		"postcss",
		"tailwindcss",
		"dependency-cruiser",
		"angular-eslint",
		"typescript-eslint",
		"glob", // guards検証スクリプトで使用
	],
};
