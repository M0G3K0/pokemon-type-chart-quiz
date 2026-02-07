/**
 * TextComponent Unit Tests
 *
 * @what  pt-text の buildTextClasses 純粋関数をテスト
 * @why   バリアント・色・ウェイト等の組み合わせで正しいCSSクラスが出力されることを保証
 *
 * Note: Angular TestBed は不要。純粋関数テストのみ。
 * DOM描画テスト（template, :host）は Vitest 環境整備後に追加予定。
 */
import { buildTextClasses } from './pt-text.logic';

/** デフォルトprops（body-md, primary, no weight, no transform, no italic, start align） */
const defaults = {
	variant: 'body-md' as const,
	color: 'primary' as const,
	weight: undefined,
	transform: 'none' as const,
	italic: false,
	align: 'start' as const,
};

describe('buildTextClasses', () => {
	// === デフォルト状態 ===

	it('should always include pt-text base class', () => {
		expect(buildTextClasses(defaults)['pt-text']).toBe(true);
	});

	it('should apply default variant body-md', () => {
		expect(buildTextClasses(defaults)['pt-text--body-md']).toBe(true);
	});

	it('should apply default color primary', () => {
		expect(buildTextClasses(defaults)['pt-text--color-primary']).toBe(true);
	});

	// === バリアント ===

	it('should apply body-lg variant class', () => {
		const classes = buildTextClasses({ ...defaults, variant: 'body-lg' });
		expect(classes['pt-text--body-lg']).toBe(true);
	});

	it('should apply label-xs variant class', () => {
		const classes = buildTextClasses({ ...defaults, variant: 'label-xs' });
		expect(classes['pt-text--label-xs']).toBe(true);
	});

	// === カラー ===

	it('should apply secondary color class', () => {
		const classes = buildTextClasses({ ...defaults, color: 'secondary' });
		expect(classes['pt-text--color-secondary']).toBe(true);
	});

	it('should apply danger color class', () => {
		const classes = buildTextClasses({ ...defaults, color: 'danger' });
		expect(classes['pt-text--color-danger']).toBe(true);
	});

	// === ウェイト ===

	it('should not apply weight class when undefined', () => {
		const classes = buildTextClasses(defaults);
		expect(classes['pt-text--weight-undefined']).toBeFalsy();
	});

	it('should apply weight-bold class when set', () => {
		const classes = buildTextClasses({ ...defaults, weight: 'bold' });
		expect(classes['pt-text--weight-bold']).toBe(true);
	});

	it('should apply weight-medium class when set', () => {
		const classes = buildTextClasses({ ...defaults, weight: 'medium' });
		expect(classes['pt-text--weight-medium']).toBe(true);
	});

	// === トランスフォーム ===

	it('should not apply transform class when none', () => {
		const classes = buildTextClasses(defaults);
		expect(classes['pt-text--transform-none']).toBeFalsy();
	});

	it('should apply uppercase transform class', () => {
		const classes = buildTextClasses({ ...defaults, transform: 'uppercase' });
		expect(classes['pt-text--transform-uppercase']).toBe(true);
	});

	// === イタリック ===

	it('should not apply italic class by default', () => {
		expect(buildTextClasses(defaults)['pt-text--italic']).toBe(false);
	});

	it('should apply italic class when true', () => {
		const classes = buildTextClasses({ ...defaults, italic: true });
		expect(classes['pt-text--italic']).toBe(true);
	});

	// === アライン ===

	it('should not apply align class when start (default)', () => {
		const classes = buildTextClasses(defaults);
		expect(classes['pt-text--align-start']).toBeFalsy();
	});

	it('should apply align-center class', () => {
		const classes = buildTextClasses({ ...defaults, align: 'center' });
		expect(classes['pt-text--align-center']).toBe(true);
	});

	it('should apply align-end class', () => {
		const classes = buildTextClasses({ ...defaults, align: 'end' });
		expect(classes['pt-text--align-end']).toBe(true);
	});

	// === 複合テスト ===

	it('should handle complex combination correctly', () => {
		const classes = buildTextClasses({
			variant: 'label-sm',
			color: 'inverse',
			weight: 'medium',
			transform: 'capitalize',
			italic: true,
			align: 'end',
		});

		expect(classes['pt-text']).toBe(true);
		expect(classes['pt-text--label-sm']).toBe(true);
		expect(classes['pt-text--color-inverse']).toBe(true);
		expect(classes['pt-text--weight-medium']).toBe(true);
		expect(classes['pt-text--transform-capitalize']).toBe(true);
		expect(classes['pt-text--italic']).toBe(true);
		expect(classes['pt-text--align-end']).toBe(true);
	});
});
