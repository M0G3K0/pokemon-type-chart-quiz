import { Component } from '@angular/core';
import { ButtonComponent } from '@ui/pt-button/pt-button';

/**
 * Demo: Button Variants
 */
@Component({
	selector: 'button-variants-demo',
	standalone: true,
	imports: [ButtonComponent],
	template: `
		@for (variant of variants; track variant) {
			<pt-button [variant]="variant">{{ variant }}</pt-button>
		}
	`,
})
export class ButtonVariantsDemoComponent {
	readonly variants = ['primary', 'secondary', 'danger', 'ghost'] as const;
}
