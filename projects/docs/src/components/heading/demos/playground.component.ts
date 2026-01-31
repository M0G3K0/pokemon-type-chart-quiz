import { Component, Input } from '@angular/core';
import { HeadingComponent, HeadingLevel, HeadingSize } from '@ui/pt-heading/pt-heading';

/**
 * Playground wrapper for Heading
 */
@Component({
	selector: 'heading-playground',
	standalone: true,
	imports: [HeadingComponent],
	template: `
		<pt-heading
			[level]="level"
			[size]="size"
			[accent]="accent"
		>{{ text }}</pt-heading>
	`,
})
export class HeadingPlaygroundComponent {
	@Input() text = '見出しテキスト';
	@Input() level: HeadingLevel = 2;
	@Input() size?: HeadingSize;
	@Input() accent = false;
}
