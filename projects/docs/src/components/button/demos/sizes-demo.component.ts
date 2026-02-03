import { Component } from '@angular/core';
import { ButtonComponent } from '@ui/pt-button/pt-button';

/**
 * Demo: Button Sizes
 */
@Component({
	selector: 'button-sizes-demo',
	standalone: true,
	imports: [ButtonComponent],
	template: `
		@for (size of sizes; track size) {
			<pt-button variant="primary" [size]="size">{{ size }}</pt-button>
		}
	`,
})
export class ButtonSizesDemoComponent {
	readonly sizes = ['sm', 'md', 'lg'] as const;
}
