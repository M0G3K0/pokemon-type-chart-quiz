import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';

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
 * <!-- Removable -->
 * <pt-chip [bgColor]="'var(--pt-color-slate-200)'" [removable]="true" (remove)="onRemove()">Filter</pt-chip>
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
	imports: [IconComponent],
	templateUrl: './pt-chip.html',
	styleUrls: ['./pt-chip.scss'],
})
export class ChipComponent {
	private readonly assetPath = inject(AssetPathService);
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
	@Input() iconSize?: 'sm' | 'md' | 'lg';

	/**
	 * Trailing icon (right side, e.g., for remove button)
	 */
	@Input() trailingIcon?: string;

	/**
	 * Whether the chip is clickable
	 * @default false
	 */
	@Input() clickable = false;

	/**
	 * Whether the chip is removable (shows × button)
	 * @default false
	 */
	@Input() removable = false;

	/**
	 * Icon-only mode (square chip with uniform padding)
	 * @default false
	 */
	@Input() iconOnly = false;

	/**
	 * Remove event emitter
	 */
	@Output() remove = new EventEmitter<void>();

	/**
	 * Get computed icon size based on chip size
	 */
	get computedIconSize(): 'sm' | 'md' | 'lg' {
		if (this.iconSize) {
			return this.iconSize;
		}
		// Icon-only mode uses larger icons
		if (this.iconOnly) {
			switch (this.size) {
				case 'sm':
					return 'sm';
				case 'lg':
					return 'lg';
				case 'md':
				default:
					return 'md';
			}
		}
		// Default icon sizes based on chip size
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

	/**
	 * Get the close icon path (for remove button)
	 */
	get closeIconPath(): string {
		return this.assetPath.icon('close');
	}
}
