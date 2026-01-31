import { Component, Input } from '@angular/core';
import { StackComponent } from '@ui/pt-stack/pt-stack';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Playground wrapper for Stack
 */
@Component({
	selector: 'stack-playground',
	standalone: true,
	imports: [StackComponent, SurfaceComponent, TextComponent],
	template: `
		<pt-stack
			[direction]="direction"
			[gap]="gap"
			[align]="align"
			[justify]="justify"
		>
			@for (i of [1, 2, 3]; track i) {
				<pt-surface variant="subtle" padding="md" radius="sm">
					<pt-text variant="body-md">アイテム {{ i }}</pt-text>
				</pt-surface>
			}
		</pt-stack>
	`,
})
export class StackPlaygroundComponent {
	@Input() direction: 'vertical' | 'horizontal' | 'responsive' = 'vertical';
	@Input() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
	@Input() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';
	@Input() justify: 'start' | 'center' | 'end' | 'between' = 'start';
}
