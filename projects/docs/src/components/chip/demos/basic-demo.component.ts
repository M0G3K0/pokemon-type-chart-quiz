import { Component } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip/pt-chip';

@Component({
  selector: 'chip-basic-demo',
  standalone: true,
  imports: [ChipComponent],
  template: `
    <pt-chip 
      [bgColor]="'var(--pt-color-surface-pressed)'"
      [textColor]="'var(--pt-color-text-primary)'"
      rounded="md"
      size="md">
      Chip
    </pt-chip>
  `,
})
export class ChipBasicDemoComponent { }
