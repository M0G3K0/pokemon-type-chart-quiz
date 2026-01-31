import { Component, Input } from '@angular/core';
import { PtRadioButtonComponent, RadioButtonFeedbackState } from '@ui/pt-radio-button/pt-radio-button';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Playground wrapper for Radio Button
 */
@Component({
	selector: 'radio-button-playground',
	standalone: true,
	imports: [PtRadioButtonComponent, TextComponent],
	template: `
		<pt-radio-button
			[value]="value"
			[selected]="selected"
			[disabled]="disabled"
			[feedbackState]="feedbackState"
		>
			<pt-text variant="body-md">{{ label }}</pt-text>
		</pt-radio-button>
	`,
})
export class RadioButtonPlaygroundComponent {
	@Input() label = '選択肢';
	@Input() value = 'option1';
	@Input() selected = false;
	@Input() disabled = false;
	@Input() feedbackState: RadioButtonFeedbackState = 'default';
}
