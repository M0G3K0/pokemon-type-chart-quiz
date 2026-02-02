import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Spinner component for loading states
 * 
 * @example
 * <pt-spinner size="md" variant="primary"></pt-spinner>
 * 
 * @reference
 * - Material Design 3: https://m3.material.io/components/progress-indicators/overview
 * - GitHub Primer: https://primer.style/design/components/spinner
 * - SmartHR: https://smarthr.design/products/components/spinner/
 */
@Component({
	selector: 'pt-spinner',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pt-spinner.html',
	styleUrls: ['./pt-spinner.scss'],
})
export class SpinnerComponent {
	/**
	 * Size of the spinner
	 * @default 'md'
	 */
	@Input() size: 'sm' | 'md' | 'lg' = 'md';

	/**
	 * Color variant of the spinner
	 * @default 'primary'
	 */
	@Input() variant: 'primary' | 'secondary' = 'primary';

	/**
	 * Accessible label for screen readers
	 * @default 'Loading...'
	 */
	@Input() ariaLabel = 'Loading...';

	/**
	 * Container element classes
	 */
	get containerClasses(): string[] {
		return [
			'pt-spinner',
			`pt-spinner--${this.size}`,
			`pt-spinner--${this.variant}`,
		];
	}
}
