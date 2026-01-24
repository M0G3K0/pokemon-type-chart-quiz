/**
 * @what  デザイントークンの命名規則を強制するStylelintルール
 * @why   3層アーキテクチャ（Primitive/Semantic/Component）の正しい使用を保証するため
 * @failure  Stylelintエラーとなり、CIが失敗する
 * @guardrail guards/design/guard/token-naming.guard.md
 */

/**
 * Primitiveトークンのパターン（直接使用禁止）
 * 
 * これらはSemantic/Componentトークン経由でのみ使用可能
 */
const PRIMITIVE_TOKEN_PATTERNS = [
	// カラー: gray系
	'/var\\(\\s*--pt-color-gray-/',
	// カラー: Pokemon type系
	'/var\\(\\s*--pt-color-pokemon-/',
	// カラー: result feedback系（lime, red）
	'/var\\(\\s*--pt-color-lime-/',
	'/var\\(\\s*--pt-color-red-/',
	// カラー: 基本色
	'/var\\(\\s*--pt-color-white/',
	'/var\\(\\s*--pt-color-black/',
	// スペーシング: 数値ベース
	'/var\\(\\s*--pt-spacing-\\d/',
];

/**
 * 許可されるトークンパターン（Semantic/Component）
 * 
 * これらは直接使用OK
 * - --pt-color-surface-*
 * - --pt-color-text-*
 * - --pt-color-action-*
 * - --pt-color-border-*
 * - --pt-color-result-* (semantic result, not primitive)
 * - --pt-card-*
 * - --pt-button-*
 * - --pt-badge-*
 * - --pt-spacing-content-*
 * - --pt-spacing-layout-*
 */

const GUARDRAIL_PATH = 'guards/design/guard/token-naming.guard.md';

module.exports = {
	/**
	 * Stylelint declaration-property-value-disallowed-list 用の設定
	 */
	rules: {
		'declaration-property-value-disallowed-list': [
			{
				// 色関連プロパティでPrimitiveトークンを禁止
				'/color/': PRIMITIVE_TOKEN_PATTERNS,
				'/background/': PRIMITIVE_TOKEN_PATTERNS,
				'/border/': PRIMITIVE_TOKEN_PATTERNS,
				'/fill/': PRIMITIVE_TOKEN_PATTERNS,
				'/stroke/': PRIMITIVE_TOKEN_PATTERNS,
			},
			{
				message: `Primitiveトークン禁止。Semantic/Componentを使用 (${GUARDRAIL_PATH})`,
			},
		],
	},

	PRIMITIVE_TOKEN_PATTERNS,
	GUARDRAIL_PATH,
};
