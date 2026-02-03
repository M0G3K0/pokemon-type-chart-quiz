import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '@ui/pt-spinner/pt-spinner';

/**
 * Playground wrapper for Spinner
 */
@Component({
	selector: 'spinner-playground',
	standalone: true,
	imports: [SpinnerComponent],
	template: `
		<pt-spinner
			[size]="size"
			[variant]="variant"
			[ariaLabel]="ariaLabel"
		></pt-spinner>
	`,
})
export class SpinnerPlaygroundComponent {
	@Input() size: 'sm' | 'md' | 'lg' = 'md';
	@Input() variant: 'primary' | 'secondary' = 'primary';
	@Input() ariaLabel = 'Loading...';
}
