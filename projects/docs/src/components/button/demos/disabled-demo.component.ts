import { Component } from '@angular/core';
import { ButtonComponent } from '@ui/pt-button/pt-button';

/**
 * Demo: Button Disabled States
 */
@Component({
	selector: 'button-disabled-demo',
	standalone: true,
	imports: [ButtonComponent],
	template: `
		@for (variant of variants; track variant) {
			<pt-button [variant]="variant" [disabled]="true">{{ variant }}</pt-button>
		}
	`,
})
export class ButtonDisabledDemoComponent {
	readonly variants = ['primary', 'secondary', 'danger', 'ghost'] as const;
}
