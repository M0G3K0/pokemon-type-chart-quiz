import { Component, Input, inject } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip/pt-chip';
import { PokemonType } from '@domain/type-chart';
import { AssetPathService } from '@app/core/services/asset-path.service';

/**
 * Pokemon Type Chip component (Semantic Wrapper)
 * 
 * @example
 * <!-- Icon only -->
 * <pt-type-chip [type]="'fire'" [showIcon]="true" rounded="full"></pt-type-chip>
 * 
 * <!-- Text only -->
 * <pt-type-chip [type]="'fire'">ほのお</pt-type-chip>
 * 
 * <!-- Icon + Text -->
 * <pt-type-chip [type]="'fire'" [showIcon]="true">ほのお</pt-type-chip>
 * 
 * @reference
 * - Atomic Design: Organism (Domain-specific wrapper)
 * - Wraps pt-chip with Pokemon Type semantics
 */
@Component({
	selector: 'pt-type-chip',
	standalone: true,
	imports: [ChipComponent],
	template: `
    <pt-chip
      [icon]="showIcon ? iconPath : undefined"
      [bgColor]="bgColor"
      [textColor]="textColor"
      [rounded]="rounded"
      [size]="size"
      [clickable]="clickable"
      [iconSize]="iconSize">
      <ng-content></ng-content>
    </pt-chip>
  `,
	styles: [`
    :host {
      display: inline-block;
      line-height: 0;
    }
  `],
})
export class TypeChipComponent {
	private readonly assetPath = inject(AssetPathService);

	/**
	 * Pokemon Type
	 */
	@Input({ required: true }) type!: PokemonType;

	/**
	 * Chip size
	 * @default 'md'
	 */
	@Input() size: 'sm' | 'md' | 'lg' = 'md';

	/**
	 * Whether to show type icon
	 * @default false
	 */
	@Input() showIcon = false;

	/**
	 * Border radius
	 * @default 'md'
	 */
	@Input() rounded: 'none' | 'sm' | 'md' | 'full' = 'md';

	/**
	 * Whether the chip is clickable
	 * @default false
	 */
	@Input() clickable = false;

	/**
	 * Icon size adjustment
	 */
	@Input() iconSize?: 'sm' | 'md' | 'lg';

	/**
	 * Text color override
	 * @default 'var(--pt-color-text-inverse)'
	 */
	@Input() textColor = 'var(--pt-color-text-inverse)';

	/**
	 * Get icon path for the Pokemon type
	 */
	get iconPath(): string {
		return this.assetPath.icon(this.type);
	}

	/**
	 * Get background color for the Pokemon type
	 */
	get bgColor(): string {
		return `var(--pt-color-pokemon-${this.type}-500)`;
	}
}

