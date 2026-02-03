import { Component, Input } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = 'xl' | 'lg' | 'md' | 'sm';

/**
 * pt-heading (Atom): コンテンツの階層構造を定義するタイポグラフィコンポーネント
 *
 * セマンティックなHTML見出し要素（h1-h6）を出力し、一貫したスタイリングを提供。
 * オプションでアクセントバー（左側の縦棒）を表示できる。
 *
 * セマンティックレベル（level）と視覚的サイズ（size）を分離しており、
 * h3要素でも視覚的には大きなサイズで表示するなど柔軟な使い方が可能。
 *
 * @example
 * ```html
 * <pt-heading [level]="2">セクションタイトル</pt-heading>
 *
 * <pt-heading [level]="3" [accent]="true">
 *   わざのダメージ倍率は？
 * </pt-heading>
 * ```
 *
 * @see https://primer.style/components/heading - GitHub Primer Heading
 * @see https://smarthr.design/products/components/heading/ - SmartHR Heading
 */
@Component({
	selector: 'pt-heading',
	standalone: true,
	imports: [NgClass, NgTemplateOutlet],
	templateUrl: './pt-heading.html',
	styleUrls: ['./pt-heading.scss'],
})
export class HeadingComponent {
	/**
	 * セマンティックな見出しレベル (h1-h6)
	 * - level=1 → h1 (画面タイトル、ページに1回のみ)
	 * - level=2 → h2 (セクションタイトル)
	 * - level=3 → h3 (ブロックタイトル)
	 * - level=4-6 → h4-h6 (サブ見出し)
	 */
	@Input({ required: true }) level!: HeadingLevel;

	/**
	 * 視覚的なサイズ。指定しない場合は level から自動推論。
	 * - xl: typography.heading.xl (画面タイトル相当)
	 * - lg: typography.heading.lg (セクションタイトル相当)
	 * - md: typography.heading.md (ブロックタイトル相当)
	 * - sm: typography.heading.sm (サブ・ブロックタイトル相当)
	 */
	@Input() size?: HeadingSize;

	/**
	 * アクセントバー（左側の縦棒）を表示するか。
	 * セクションの開始を視覚的に強調する場合に使用。
	 */
	@Input() accent = false;

	/**
	 * 動的クラス生成 (Approach A: Getter Pattern)
	 * テンプレート内の条件分岐を排除し、ロジックをTSに集約。
	 */
	get headingClasses(): string[] {
		const actualSize = this.size ?? this.defaultSizeForLevel(this.level);
		return [
			'pt-heading',
			`pt-heading--${actualSize}`,
			this.accent ? 'pt-heading--accent' : '',
		].filter(Boolean);
	}

	/**
	 * レベルからデフォルトのサイズを推論
	 */
	private defaultSizeForLevel(level: HeadingLevel): HeadingSize {
		const map: Record<HeadingLevel, HeadingSize> = {
			1: 'xl',
			2: 'lg',
			3: 'md',
			4: 'sm',
			5: 'sm',
			6: 'sm',
		};
		return map[level];
	}
}
