import { Component } from '@angular/core';
import { HeadingComponent } from '@ui/pt-heading/pt-heading';

/**
 * Demo: Heading with Accent Bar
 */
@Component({
	selector: 'heading-accent-demo',
	standalone: true,
	imports: [HeadingComponent],
	template: `
		<pt-heading [level]="3" [accent]="true">
			わざのダメージ倍率は？
		</pt-heading>
	`,
})
export class HeadingAccentDemoComponent { }
