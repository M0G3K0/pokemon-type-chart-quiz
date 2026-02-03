import { Component } from '@angular/core';
import { TextComponent, TextWeight } from '@ui/pt-text/pt-text';

/**
 * Demo: Text Weights
 */
@Component({
	selector: 'text-weights-demo',
	standalone: true,
	imports: [TextComponent],
	template: `
		@for (weight of weights; track weight) {
			<pt-text variant="body-md" [weight]="weight">{{ weight }}</pt-text>
		}
	`,
})
export class TextWeightsDemoComponent {
	readonly weights: TextWeight[] = ['normal', 'medium', 'bold', 'black'];
}
