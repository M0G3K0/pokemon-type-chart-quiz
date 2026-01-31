import { Component } from '@angular/core';
import { SpinnerComponent } from '@ui/pt-spinner/pt-spinner';

/**
 * Demo: Spinner Variants
 */
@Component({
	selector: 'spinner-variants-demo',
	standalone: true,
	imports: [SpinnerComponent],
	template: `
		@for (variant of variants; track variant) {
			<pt-spinner size="md" [variant]="variant"></pt-spinner>
		}
	`,
})
export class SpinnerVariantsDemoComponent {
	readonly variants = ['primary', 'secondary'] as const;
}
