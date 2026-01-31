import { Component } from '@angular/core';
import { PtRadioButtonComponent, RadioButtonFeedbackState } from '@ui/pt-radio-button/pt-radio-button';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Radio Button Feedback States
 */
@Component({
	selector: 'radio-button-feedback-demo',
	standalone: true,
	imports: [PtRadioButtonComponent, TextComponent],
	template: `
		@for (state of states; track state) {
			<pt-radio-button
				[value]="state"
				[feedbackState]="state"
				[disabled]="state !== 'default'"
			>
				<pt-text variant="body-md">{{ state }}</pt-text>
			</pt-radio-button>
		}
	`,
})
export class RadioButtonFeedbackDemoComponent {
	readonly states: RadioButtonFeedbackState[] = ['default', 'correct', 'wrong', 'actual'];
}
