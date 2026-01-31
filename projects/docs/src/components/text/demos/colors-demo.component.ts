import { Component } from '@angular/core';
import { TextComponent, TextColor } from '@ui/pt-text/pt-text';

/**
 * Demo: Text Colors
 */
@Component({
	selector: 'text-colors-demo',
	standalone: true,
	imports: [TextComponent],
	template: `
		@for (color of colors; track color) {
			<pt-text variant="body-md" [color]="color">{{ color }}</pt-text>
		}
	`,
	styles: [`
		:host {
			display: flex;
			gap: 16px;
			padding: 8px;
			background: linear-gradient(90deg, white 80%, #333 80%);
		}
	`],
})
export class TextColorsDemoComponent {
	readonly colors: TextColor[] = ['primary', 'secondary', 'disabled', 'danger', 'inverse'];
}
