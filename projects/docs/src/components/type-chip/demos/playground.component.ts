import { Component, Input } from '@angular/core';
import { TypeChipComponent } from '@ui/pt-type-chip/pt-type-chip';
import { POKEMON_TYPES_MAP } from '@domain/type-chart';

/**
 * Playground wrapper for TypeChipComponent
 * Only essential inputs exposed for interactive experimentation
 */
@Component({
	selector: 'type-chip-playground',
	standalone: true,
	imports: [TypeChipComponent],
	template: `
    <pt-type-chip 
      [type]="type" 
      [size]="size" 
      [showIcon]="showIcon"
      [rounded]="rounded">
      {{ getLabel() }}
    </pt-type-chip>
  `,
})
export class TypeChipPlaygroundComponent {
	/**
	 * Pokemon Type
	 */
	@Input() type: 'normal' | 'fire' | 'water' | 'electric' | 'grass' | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' | 'dark' | 'steel' | 'fairy' = 'fire';

	/**
	 * Chip size
	 */
	@Input() size: 'sm' | 'md' | 'lg' = 'md';

	/**
	 * Show type icon
	 */
	@Input() showIcon = true;

	/**
	 * Border radius
	 */
	@Input() rounded: 'none' | 'sm' | 'md' | 'full' = 'md';

	/**
	 * Get Japanese label for current type
	 */
	getLabel(): string {
		return POKEMON_TYPES_MAP[this.type] || this.type;
	}
}
