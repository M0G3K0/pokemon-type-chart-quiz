/**
 * @what  デザイントークンの命名規則を強制するStylelintルール
 * @why   3層アーキテクチャで、SCSSからはTier 3のみ使用を保証するため
 * @failure  Stylelintエラーとなり、CIが失敗する
 * @guardrail guards/design/guard/token-naming.guard.md
 *
 * 2つのルールセットをエクスポート:
 *   - baseRules:          全SCSSファイル向け（Tier 1 禁止）
 *   - componentOverrides: src/app/ui/ 配下向け（Tier 1 + Tier 2 禁止 = Tier 3 のみ許可）
 */

const GUARDRAIL_PATH = 'guards/design/guard/token-naming.guard.md';

// ─── Tier 1: Primitive トークン（全SCSSで禁止） ───
const PRIMITIVE_TOKEN_PATTERNS = [
	'/--pt-color-gray-/',
	'/--pt-color-pokemon-/',
	'/--pt-color-lime-/',
	'/--pt-color-red-/',
	'/--pt-color-white/',
	'/--pt-color-black/',
	'/--pt-space-\\d/',
];

// ─── Tier 2: Semantic トークン（コンポーネントSCSSで禁止） ───
const SEMANTIC_TOKEN_PATTERNS = [
	'/--pt-typography-/',
	'/--pt-color-surface-/',
	'/--pt-color-text-/',
	'/--pt-color-border-/',
	'/--pt-color-action-/',
	'/--pt-color-result-/',
	'/--pt-spacing-/',
	'/--pt-semantic-/',
	'/--pt-font-/',
	'/--pt-motion-/',
	'/--pt-elevation-/',
];

// ─── 統合パターン ───
const ALL_DISALLOWED = [...PRIMITIVE_TOKEN_PATTERNS, ...SEMANTIC_TOKEN_PATTERNS];

// ─── プロパティ一覧（全カテゴリ網羅） ───
const ALL_PROPERTIES = [
	'/color/',
	'/background/',
	'/border/',
	'/fill/',
	'/stroke/',
	'/gap/',
	'/padding/',
	'/margin/',
	'/width/',
	'/height/',
	'/font/',
	'border-radius',
	'/transition/',
	'/animation/',
];

/**
 * プロパティとパターンのマッピングを生成するヘルパー
 */
function buildPropertyMap(properties, patterns) {
	const map = {};
	for (const prop of properties) {
		map[prop] = patterns;
	}
	return map;
}

// ─── ルールセット ───

/** 全SCSSファイル向け：Tier 1 禁止 */
const baseRules = {
	'declaration-property-value-disallowed-list': [
		buildPropertyMap(ALL_PROPERTIES, PRIMITIVE_TOKEN_PATTERNS),
		{
			message: `Primitiveトークン禁止。Semantic/Componentを使用 (${GUARDRAIL_PATH})`,
		},
	],
};

/** コンポーネントSCSS向け：Tier 1 + Tier 2 禁止（Tier 3 のみ許可） */
const componentOverrides = {
	'declaration-property-value-disallowed-list': [
		buildPropertyMap(ALL_PROPERTIES, ALL_DISALLOWED),
		{
			message: `コンポーネントSCSSはTier3トークンのみ参照可。Tier3 JSONにエイリアスを追加してください (${GUARDRAIL_PATH})`,
		},
	],
};

module.exports = {
	baseRules,
	componentOverrides,
	PRIMITIVE_TOKEN_PATTERNS,
	SEMANTIC_TOKEN_PATTERNS,
	ALL_DISALLOWED,
	GUARDRAIL_PATH,
};
