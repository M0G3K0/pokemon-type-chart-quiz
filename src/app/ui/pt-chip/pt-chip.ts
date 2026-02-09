import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '@ui/pt-icon';

/**
 * Chip component for displaying compact information units
 * 
 * @example
 * <!-- Icon only (square) -->
 * <pt-chip [icon]="iconPath" [bgColor]="'var(--pt-color-pokemon-fire-500)'" rounded="full" [iconOnly]="true"></pt-chip>
 * 
 * <!-- Text only -->
 * <pt-chip [bgColor]="'var(--pt-color-pokemon-fire-500)'" size="sm">ほのお</pt-chip>
 * 
 * <!-- Icon + Text -->
 * <pt-chip [icon]="iconPath" [bgColor]="'var(--pt-color-pokemon-fire-500)'" rounded="full">ほのお</pt-chip>
 * 
 * <!-- With trailing icon -->
 * <pt-chip [icon]="iconPath" [bgColor]="'var(--pt-color-pokemon-fire-500)'" rounded="full">ほのお</pt-chip>
 * 
 * @reference
 * - Atomic Design: Molecule (Generic flexible component)
 * - Material Design 3 Chips: https://m3.material.io/components/chips/overview
 * - GitHub Primer Labels: https://primer.style/components/label
 * - SmartHR Tag: https://smarthr.design/products/components/tag/
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
	 * Background color (CSS variable or color code)
	 */
	@Input() bgColor?: string;

	/**
	 * Text color (CSS variable or color code)
	 * @default 'var(--pt-color-text-inverse)'
	 */
	@Input() textColor = 'var(--pt-color-text-inverse)';

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
