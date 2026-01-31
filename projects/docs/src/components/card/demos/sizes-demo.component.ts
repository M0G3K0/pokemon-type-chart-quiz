import { Component } from '@angular/core';
import { CardComponent } from '@ui/pt-card/pt-card';
import { CardContentComponent } from '@ui/pt-card/pt-card-content';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Card Sizes
 */
@Component({
	selector: 'card-sizes-demo',
	standalone: true,
	imports: [CardComponent, CardContentComponent, TextComponent],
	template: `
		@for (size of sizes; track size) {
			<pt-card [size]="size">
				<pt-card-content>
					<pt-text variant="body-md">size={{ size }}</pt-text>
				</pt-card-content>
			</pt-card>
		}
	`,
	styles: [`
		:host {
			display: flex;
			gap: 16px;
			align-items: flex-start;
		}
	`],
})
export class CardSizesDemoComponent {
	readonly sizes = ['sm', 'md', 'lg'] as const;
}
