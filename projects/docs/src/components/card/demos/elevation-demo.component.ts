import { Component } from '@angular/core';
import { CardComponent } from '@ui/pt-card/pt-card';
import { CardContentComponent } from '@ui/pt-card/pt-card-content';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Card Elevation
 */
@Component({
	selector: 'card-elevation-demo',
	standalone: true,
	imports: [CardComponent, CardContentComponent, TextComponent],
	template: `
		@for (elevation of elevations; track elevation) {
			<pt-card [elevation]="elevation">
				<pt-card-content>
					<pt-text variant="body-md">elevation={{ elevation }}</pt-text>
				</pt-card-content>
			</pt-card>
		}
	`,
	styles: [`
		:host {
			display: flex;
			gap: 16px;
		}
	`],
})
export class CardElevationDemoComponent {
	readonly elevations = ['flat', 'raised', 'overlay'] as const;
}
