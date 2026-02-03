import { Component } from '@angular/core';
import { SpinnerComponent } from '@ui/pt-spinner/pt-spinner';

/**
 * Demo: Spinner Sizes
 */
@Component({
	selector: 'spinner-sizes-demo',
	standalone: true,
	imports: [SpinnerComponent],
	template: `
		@for (size of sizes; track size) {
			<pt-spinner [size]="size"></pt-spinner>
		}
	`,
})
export class SpinnerSizesDemoComponent {
	readonly sizes = ['sm', 'md', 'lg'] as const;
}
