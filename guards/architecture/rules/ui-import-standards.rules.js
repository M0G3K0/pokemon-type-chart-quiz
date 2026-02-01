/**
 * UI Component Import Standards
 *
 * @what  UIコンポーネントの import がエイリアス + Barrel 形式になっているか検査
 * @why   カプセル化、一貫性、リファクタリング耐性のため
 * @failure  直接ファイル参照や相対パスを許可すると、変更時に壊れやすくなる
 * @guardrail guards/architecture/guard/ui-import-standards.guard.md
 */

const GUARDRAIL_PATH = 'guards/architecture/guard/ui-import-standards.guard.md';

/**
 * ESLint の no-restricted-imports ルール設定
 *
 * 以下のパターンを禁止:
 * 1. @ui/pt-xxx/pt-xxx (直接ファイル参照)
 * 2. ../ui/pt-xxx または ../../ui/pt-xxx (相対パス参照)
 */
const uiImportRestrictions = {
	name: 'no-restricted-imports',
	options: [
		{
			patterns: [
				{
					// @ui/pt-component/pt-component 形式を禁止
					group: ['@ui/pt-*/pt-*'],
					message: `Use barrel import: '@ui/pt-<component>' instead of direct file reference. (${GUARDRAIL_PATH})`,
				},
				{
					// 相対パスでの UI import を禁止
					group: ['**/ui/pt-*/**', '**/ui/pt-*/pt-*'],
					message: `Use alias import: '@ui/pt-<component>' instead of relative path. (${GUARDRAIL_PATH})`,
				},
			],
		},
	],
};

/**
 * UI コンポーネントディレクトリ内での例外設定
 * 同一ディレクトリ内の相対 import は許可
 */
const uiInternalExceptions = {
	// src/app/ui/** 内では相対パスの同一ディレクトリ import を許可
	files: ['src/app/ui/**/*.ts'],
	rules: {
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					{
						// 他の UI コンポーネントへの直接参照は禁止（barrel 経由を強制）
						group: ['@ui/pt-*/pt-*'],
						message: `Use barrel import: '@ui/pt-<component>' instead of direct file reference. (${GUARDRAIL_PATH})`,
					},
				],
			},
		],
	},
};

module.exports = {
	rules: {
		'no-restricted-imports': ['error', ...uiImportRestrictions.options],
	},
	GUARDRAIL_PATH,
	// ESLint config に直接使える形式
	eslintConfig: {
		rules: {
			'no-restricted-imports': ['error', ...uiImportRestrictions.options],
		},
	},
	// 例外設定
	internalExceptions: uiInternalExceptions,
};
