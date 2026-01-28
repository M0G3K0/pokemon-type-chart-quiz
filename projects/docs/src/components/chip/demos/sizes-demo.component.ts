import { Component } from '@angular/core';
import { ChipComponent } from '../../../../../../src/app/ui/pt-chip/pt-chip';
import { CHIP_SIZES, ChipSize } from '../../../../../../src/app/ui/pt-chip/pt-chip.types';

@Component({
	selector: 'chip-sizes-demo',
	standalone: true,
	imports: [ChipComponent],
	template: `
    @for (size of sizes; track size) {
      <pt-chip 
        [size]="size"
        [bgColor]="'var(--pt-color-gray-600)'"
        [textColor]="'var(--pt-color-text-inverse)'"
        rounded="md">
        {{ size }}
      </pt-chip>
    }
  `,
})
export class ChipSizesDemoComponent {
	readonly sizes: ChipSize[] = CHIP_SIZES;
}
