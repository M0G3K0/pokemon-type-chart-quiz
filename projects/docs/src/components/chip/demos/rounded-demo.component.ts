import { Component } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip/pt-chip';
import { CHIP_ROUNDED, ChipRounded } from '@ui/pt-chip/pt-chip.types';

@Component({
  selector: 'chip-rounded-demo',
  standalone: true,
  imports: [ChipComponent],
  template: `
    @for (rounded of roundedVariants; track rounded) {
      <pt-chip 
        [rounded]="rounded"
        [bgColor]="'var(--pt-color-surface-pressed)'"
        [textColor]="'var(--pt-color-text-primary)'"
        size="md">
        {{ rounded }}
      </pt-chip>
    }
  `,
})
export class ChipRoundedDemoComponent {
  readonly roundedVariants: ChipRounded[] = CHIP_ROUNDED;
}
