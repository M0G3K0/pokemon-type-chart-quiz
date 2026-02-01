import { Component } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip/pt-chip';

@Component({
  selector: 'chip-basic-demo',
  standalone: true,
  imports: [ChipComponent],
  template: `
    <pt-chip 
      [bgColor]="'var(--pt-color-surface-secondary)'"
      [textColor]="'var(--pt-color-text-primary)'"
      rounded="md"
      size="md">
      タグ
    </pt-chip>
  `,
})
export class ChipBasicDemoComponent { }
