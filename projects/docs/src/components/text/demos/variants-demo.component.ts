import { Component } from '@angular/core';
import { TextComponent, TextVariant } from '@ui/pt-text/pt-text';

/**
 * Demo: Text Variants
 */
@Component({
	selector: 'text-variants-demo',
	standalone: true,
	imports: [TextComponent],
	template: `
		@for (variant of variants; track variant) {
			<pt-text [variant]="variant">{{ variant }}</pt-text>
		}
	`,
	styles: [`
		:host {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	`],
})
export class TextVariantsDemoComponent {
	readonly variants: TextVariant[] = [
		'body-lg', 'body-md', 'body-sm',
		'label-md', 'label-sm', 'label-xs'
	];
}
