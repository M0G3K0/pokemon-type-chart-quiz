import { Component, Input } from '@angular/core';
import {
	TextComponent,
	TextVariant,
	TextColor,
	TextWeight,
	TextTransform,
	TextElement,
	TextAlign
} from '@ui/pt-text/pt-text';

/**
 * Playground wrapper for Text
 */
@Component({
	selector: 'text-playground',
	standalone: true,
	imports: [TextComponent],
	template: `
		<pt-text
			[variant]="variant"
			[color]="color"
			[weight]="weight"
			[transform]="transform"
			[element]="element"
			[italic]="italic"
			[align]="align"
		>{{ text }}</pt-text>
	`,
})
export class TextPlaygroundComponent {
	@Input() text = 'サンプルテキスト';
	@Input() variant: TextVariant = 'body-md';
	@Input() color: TextColor = 'primary';
	@Input() weight?: TextWeight;
	@Input() transform: TextTransform = 'none';
	@Input() element: TextElement = 'span';
	@Input() italic = false;
	@Input() align: TextAlign = 'start';
}
