import { Component, Input, inject, HostBinding } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip';
import { PokemonType } from '@domain/type-chart';
import { AssetPathService } from '@app/core/services/asset-path.service';

/**
 * Pokemon Type Chip component (SDK Wrapper)
 * 
 * pt-chip をラップし、Pokemon タイプに基づく色を Tier 3 トークンで自動適用する。
 * 色は type-chip.json で一元管理され、NgDoc に自動反映される。
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
 * - Colors defined in: design-tokens/tier3-component/type-chip.json
 */
@Component({
	selector: 'pt-type-chip',
	standalone: true,
	imports: [ChipComponent],
	template: `
    <pt-chip
      [icon]="showIcon ? iconPath : undefined"
      [rounded]="rounded"
      [size]="size"
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
	 * Icon size adjustment
	 */
	@Input() iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	/**
	 * Inject --pt-chip-bg CSS variable from Tier 3 type-chip token
	 */
	@HostBinding('style.--pt-chip-bg')
	get chipBg(): string {
		return `var(--pt-type-chip-color-${this.type}-bg)`;
	}

	/**
	 * Inject --pt-chip-text CSS variable from Tier 3 type-chip token
	 */
	@HostBinding('style.--pt-chip-text')
	get chipText(): string {
		return `var(--pt-type-chip-color-${this.type}-text)`;
	}

	/**
	 * Get icon path for the Pokemon type
	 */
	get iconPath(): string {
		return this.assetPath.icon(this.type);
	}
}
