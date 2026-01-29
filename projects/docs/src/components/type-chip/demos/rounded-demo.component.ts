import { Component } from '@angular/core';
import { TypeChipComponent } from '@ui/pt-type-chip/pt-type-chip';
import { CHIP_ROUNDED, ChipRounded } from '@ui/pt-chip/pt-chip.types';

@Component({
	selector: 'type-chip-rounded-demo',
	standalone: true,
	imports: [TypeChipComponent],
	template: `
    @for (rounded of roundedVariants; track rounded) {
      <pt-type-chip type="fire" [rounded]="rounded">ほのお</pt-type-chip>
    }
  `,
})
export class TypeChipRoundedDemoComponent {
	readonly roundedVariants: ChipRounded[] = CHIP_ROUNDED;
}
