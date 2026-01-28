import { Component } from '@angular/core';
import { ChipComponent } from '../../../../../../src/app/ui/pt-chip/pt-chip';

@Component({
	selector: 'chip-basic-demo',
	standalone: true,
	imports: [ChipComponent],
	template: `
    <pt-chip 
      [bgColor]="'var(--pt-color-gray-300)'"
      [textColor]="'var(--pt-color-text-primary)'"
      rounded="md"
      size="md">
      タグ
    </pt-chip>
  `,
})
export class ChipBasicDemoComponent { }
