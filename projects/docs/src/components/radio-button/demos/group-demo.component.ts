import { Component, signal } from '@angular/core';
import { PtRadioButtonComponent } from '@ui/pt-radio-button/pt-radio-button';
import { PtRadioGroupComponent } from '@ui/pt-radio-button/pt-radio-group';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Radio Button Group
 */
@Component({
	selector: 'radio-button-group-demo',
	standalone: true,
	imports: [PtRadioButtonComponent, PtRadioGroupComponent, TextComponent],
	template: `
		<pt-radio-group
			name="difficulty"
			[value]="selectedDifficulty()"
			(valueChange)="selectedDifficulty.set($event)"
			layout="horizontal"
		>
			@for (option of options; track option.value) {
				<pt-radio-button [value]="option.value">
					<pt-text variant="body-md">{{ option.label }}</pt-text>
				</pt-radio-button>
			}
		</pt-radio-group>
		<pt-text variant="label-sm" color="secondary">選択中: {{ selectedDifficulty() }}</pt-text>
	`,
	styles: [`
		:host {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	`],
})
export class RadioButtonGroupDemoComponent {
	readonly options = [
		{ value: 'easy', label: 'かんたん' },
		{ value: 'normal', label: 'ふつう' },
		{ value: 'hard', label: 'むずかしい' },
	];
	selectedDifficulty = signal('normal');
}
