import { Component } from '@angular/core';
import { ChipComponent } from '../../../../../../src/app/ui/pt-chip/pt-chip';
import { CHIP_ROUNDED, ChipRounded } from '../../../../../../src/app/ui/pt-chip/pt-chip.types';

@Component({
  selector: 'chip-rounded-demo',
  standalone: true,
  imports: [ChipComponent],
  template: `
    @for (rounded of roundedVariants; track rounded) {
      <pt-chip 
        [rounded]="rounded"
        [bgColor]="'var(--pt-color-pokemon-fire-500)'"
        size="md">
        {{ rounded }}
      </pt-chip>
    }
  `,
})
export class ChipRoundedDemoComponent {
  readonly roundedVariants: ChipRounded[] = CHIP_ROUNDED;
}
