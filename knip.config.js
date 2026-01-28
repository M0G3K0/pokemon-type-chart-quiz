/**
 * @type {import('knip').KnipConfig}
 *
 * 除外ルールを追加する際は必ず理由をコメントで記載すること。
 * 一時的な除外には対応するIssue番号を付けること。
 */
module.exports = {
	ignore: [
		// テストファイルはvitest経由で使用（knipは検出しない）
		'src/**/*.spec.ts',
		// ガードレールスクリプトはCI/手動で実行
		'guards/**/*',
		// type-chartはランタイムで使用（静的解析では検出されない）
		'src/app/domain/type-chart.ts',
		// download-icons.jsは手動スクリプト
		'scripts/download-icons.js',
		// TODO(Issue #34): Remove when first component imports tokens
		'src/design-system/tokens/**/*',
		'src/styles/generated/**/*',

		// ─────────────────────────────────────────────────────────────────────
		// Design System コンポーネント (src/app/ui/pt-*)
		// ─────────────────────────────────────────────────────────────────────
		// Design System は「カタログ」として存在することに価値がある。
		// 使用されるかどうかは判断基準にならない。
		// 各コンポーネントは将来の機能追加で使用される可能性があるため、
		// 未使用であっても削除しない。
		// ─────────────────────────────────────────────────────────────────────
		'src/app/ui/pt-*/**/*',
		// NgDocドキュメントプロジェクト（別アプリとして独立）
		'projects/docs/**/*',
	],
	ignoreDependencies: [
		// Testing Library系はテストで使用（将来的に）
		'@testing-library/angular',
		'@testing-library/dom',
		'@testing-library/user-event',
		// Angular testing用（vitest直接実行のため明示的importなし）
		'@angular/platform-browser-dynamic',
		// NgDoc用（アセット提供のため明示的importなし）
		'@ng-doc/ui-kit',
	],
};
