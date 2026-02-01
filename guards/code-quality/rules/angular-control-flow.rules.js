/**
 * Angular Control Flow Syntax Rules
 *
 * @what  Angular 17+ の新しい制御フロー構文を強制する
 * @why   従来の *ngIf, *ngFor, *ngSwitch は非推奨、新構文はパフォーマンスと可読性が向上
 * @failure  非推奨構文を許可すると将来の Angular バージョンアップで破壊的変更の影響を受ける
 * @guardrail guards/code-quality/guard/angular-control-flow.guard.md
 */

const GUARDRAIL_PATH = 'guards/code-quality/guard/angular-control-flow.guard.md';

/**
 * Angular ESLint Template ルール設定
 *
 * @angular-eslint/template/prefer-control-flow を使用して
 * 新しい制御フロー構文への移行を強制する
 */
module.exports = {
	GUARDRAIL_PATH,

	/**
	 * Angular テンプレート用 ESLint 設定
	 * eslint.config.mjs の Angular テンプレートセクションで使用
	 */
	templateRules: {
		'@angular-eslint/template/prefer-control-flow': 'error',
	},

	/**
	 * 非推奨パターンのリスト（ドキュメント用）
	 */
	deprecatedPatterns: [
		{ pattern: '*ngIf', replacement: '@if' },
		{ pattern: '*ngFor', replacement: '@for' },
		{ pattern: '*ngSwitch', replacement: '@switch' },
		{ pattern: '*ngSwitchCase', replacement: '@case' },
		{ pattern: '*ngSwitchDefault', replacement: '@default' },
	],
};
