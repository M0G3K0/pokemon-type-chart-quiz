import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@ui/pt-icon';

/**
 * Chip component for displaying compact information units
 * 
 * 色はCSS変数 `--pt-chip-bg` / `--pt-chip-text` で外部から注入される。
 * このコンポーネントは「形」のみを担当し、色の決定権は持たない。
 * 
 * @example
 * <!-- pt-type-chip 等のラッパーコンポーネント経由で使用 -->
 * <pt-type-chip [type]="'fire'" [showIcon]="true">ほのお</pt-type-chip>
 * 
 * @reference
 * - Atomic Design: Molecule (Generic flexible component)
 * - Material Design 3 Chips: https://m3.material.io/components/chips/overview
 * - GitHub Primer Labels: https://primer.style/components/label
 */
@Component({
	selector: 'pt-chip',
	standalone: true,
	imports: [CommonModule, IconComponent],
	templateUrl: './pt-chip.html',
	styleUrls: ['./pt-chip.scss'],
})
export class ChipComponent {
	/**
	 * Chip size
	 * @default 'md'
	 */
	@Input() size: 'sm' | 'md' | 'lg' = 'md';

	/**
	 * Border radius
	 * @default 'md'
	 */
	@Input() rounded: 'none' | 'sm' | 'md' | 'full' = 'md';

	/**
	 * Leading icon (left side)
	 */
	@Input() icon?: string;

	/**
	 * Icon size adjustment
	 */
	@Input() iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * Icon-only mode (square chip with uniform padding)
	 * @default false
	 */
	@Input() iconOnly = false;

	/**
	 * Get computed icon size based on chip size
	 * チップ内アイコンは高密度UIのため、通常より1段階小さいサイズを使用
	 */
	get computedIconSize(): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
		if (this.iconSize) {
			return this.iconSize;
		}
		// Icon-only mode uses matching icons
		if (this.iconOnly) {
			switch (this.size) {
				case 'sm':
					return 'sm';
				case 'lg':
					return 'md';
				case 'md':
				default:
					return 'sm';
			}
		}
		// Default: チップ内はテキストと並ぶため、1段階小さいサイズ
		switch (this.size) {
			case 'sm':
				return 'xs';  // sm chip → xs icon (16px)
			case 'lg':
				return 'sm';  // lg chip → sm icon (20px)
			case 'md':
			default:
				return 'xs';  // md chip → xs icon (16px)
		}
	}

	/**
	 * Container element classes
	 */
	get containerClasses(): string[] {
		return [
			'pt-chip',
			`pt-chip--${this.size}`,
			`pt-chip--rounded-${this.rounded}`,
		];
	}
}
