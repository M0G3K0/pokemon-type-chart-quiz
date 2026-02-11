import { Component } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip/pt-chip';
import { CHIP_SIZES, ChipSize } from '@ui/pt-chip/pt-chip.types';

@Component({
  selector: 'chip-sizes-demo',
  standalone: true,
  imports: [ChipComponent],
  template: `
    @for (size of sizes; track size) {
      <pt-chip 
        [size]="size"
        rounded="md">
        {{ size }}
      </pt-chip>
    }
  `,
  styles: [`
    :host {
      --pt-chip-bg: var(--pt-color-surface-pressed);
      --pt-chip-text: var(--pt-color-text-primary);
    }
  `],
})
export class ChipSizesDemoComponent {
  readonly sizes: ChipSize[] = CHIP_SIZES;
}
