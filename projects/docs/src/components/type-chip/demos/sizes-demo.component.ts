import { Component } from '@angular/core';
import { TypeChipComponent } from '../../../../../../src/app/ui/pt-type-chip/pt-type-chip';
import { CHIP_SIZES, ChipSize } from '../../../../../../src/app/ui/pt-chip/pt-chip.types';

@Component({
	selector: 'type-chip-sizes-demo',
	standalone: true,
	imports: [TypeChipComponent],
	template: `
    @for (size of sizes; track size) {
      <pt-type-chip type="fire" [size]="size">ほのお</pt-type-chip>
    }
  `,
})
export class TypeChipSizesDemoComponent {
	readonly sizes: ChipSize[] = CHIP_SIZES;
}
