/**
 * @what  コンポーネントSCSSがTier3トークンのみを参照することを強制
 * @why   AIが新しいコンポーネントやバリエーションを作成する際のルールを明確にするため
 * @failure  Stylelintエラーとなり、CIが失敗する
 * @guardrail guards/design/guard/tier3-only.guard.md
 */

const GUARDRAIL_PATH = 'guards/design/guard/tier3-only.guard.md';

/**
 * Tier2 セマンティックトークンのパターン（コンポーネントSCSSでは直接使用禁止）
 *
 * これらはTier3コンポーネントトークン経由でのみ使用可能
 * 例: --pt-typography-heading-xl-* → --pt-heading-font-xl-*
 */
const TIER2_SEMANTIC_PATTERNS = [
	// Typography (should use component-specific tokens)
	'/var\\(\\s*--pt-typography-/',

	// Surface colors (should be wrapped in component tokens)
	'/var\\(\\s*--pt-color-surface-/',

	// Text colors (should be wrapped in component tokens)
	'/var\\(\\s*--pt-color-text-/',

	// Border colors (should be wrapped in component tokens)
	'/var\\(\\s*--pt-color-border-/',

	// Action colors (should be wrapped in component tokens)
	'/var\\(\\s*--pt-color-action-/',

	// Result colors (should be wrapped in component tokens)
	'/var\\(\\s*--pt-color-result-/',

	// Semantic spacing (should use component tokens)
	'/var\\(\\s*--pt-spacing-content-/',
	'/var\\(\\s*--pt-spacing-layout-/',
	'/var\\(\\s*--pt-semantic-/',
];

/**
 * 許可されるTier3コンポーネントトークンのプレフィックス
 *
 * これらはコンポーネントSCSSで直接使用OK:
 * - --pt-button-*
 * - --pt-card-*
 * - --pt-heading-*
 * - --pt-text-*
 * - --pt-avatar-*
 * - --pt-chip-*
 * - --pt-spinner-*
 * - --pt-icon-*
 * - --pt-badge-*
 * - --pt-radio-button-*
 * - --pt-surface-*
 * - --pt-grid-*
 * - --pt-stack-*
 * - --pt-type-chip-*
 */
const ALLOWED_TIER3_PREFIXES = [
	'button',
	'card',
	'heading',
	'text',
	'avatar',
	'chip',
	'spinner',
	'icon',
	'badge',
	'radio-button',
	'surface',
	'grid',
	'stack',
	'type-chip',
];

/**
 * Stylelint 設定
 *
 * Note: この設定は src/app/ui/**\/*.scss にのみ適用される（.stylelintrc.js の overrides で設定）
 */
module.exports = {
	rules: {
		'declaration-property-value-disallowed-list': [
			{
				// すべてのプロパティでTier2トークン直接使用を禁止
				'/.*/': TIER2_SEMANTIC_PATTERNS,
			},
			{
				message: `コンポーネントSCSSはTier3トークンのみ参照可。Tier3 JSONにエイリアスを追加してください (${GUARDRAIL_PATH})`,
			},
		],
	},

	TIER2_SEMANTIC_PATTERNS,
	ALLOWED_TIER3_PREFIXES,
	GUARDRAIL_PATH,
};
