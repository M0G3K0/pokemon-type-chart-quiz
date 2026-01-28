import { Component } from '@angular/core';
import { TypeChipComponent } from '../../../../../../src/app/ui/pt-type-chip/pt-type-chip';
import { POKEMON_TYPES, POKEMON_TYPES_MAP, PokemonType } from '../../../../../../src/app/domain/type-chart';

@Component({
	selector: 'type-chip-types-demo',
	standalone: true,
	imports: [TypeChipComponent],
	template: `
    @for (type of types; track type) {
      <pt-type-chip [type]="type" [showIcon]="true">
        {{ getLabel(type) }}
      </pt-type-chip>
    }
  `,
})
export class TypeChipTypesDemoComponent {
	readonly types = POKEMON_TYPES as PokemonType[];

	getLabel(type: PokemonType): string {
		return POKEMON_TYPES_MAP[type];
	}
}
