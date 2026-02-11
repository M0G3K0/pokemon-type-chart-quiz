import { Component } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip/pt-chip';

@Component({
  selector: 'chip-basic-demo',
  standalone: true,
  imports: [ChipComponent],
  template: `
    <pt-chip 
      rounded="md"
      size="md">
      Chip
    </pt-chip>
  `,
  styles: [`
    :host {
      --pt-chip-bg: var(--pt-color-surface-pressed);
      --pt-chip-text: var(--pt-color-text-primary);
    }
  `],
})
export class ChipBasicDemoComponent { }
