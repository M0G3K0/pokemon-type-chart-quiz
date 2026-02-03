import { Component } from '@angular/core';
import { HeadingComponent, HeadingLevel } from '@ui/pt-heading/pt-heading';

/**
 * Demo: Heading Levels
 */
@Component({
	selector: 'heading-levels-demo',
	standalone: true,
	imports: [HeadingComponent],
	template: `
		@for (level of levels; track level) {
			<pt-heading [level]="level">見出しレベル {{ level }}</pt-heading>
		}
	`,
	styles: [`
		:host {
			display: flex;
			flex-direction: column;
			gap: 16px;
		}
	`],
})
export class HeadingLevelsDemoComponent {
	readonly levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6];
}
