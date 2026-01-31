import { Component } from '@angular/core';
import { StackComponent } from '@ui/pt-stack/pt-stack';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Stack Direction
 */
@Component({
	selector: 'stack-direction-demo',
	standalone: true,
	imports: [StackComponent, SurfaceComponent, TextComponent],
	template: `
		@for (direction of directions; track direction) {
			<div class="demo-container">
				<pt-text variant="label-sm" color="secondary">{{ direction }}</pt-text>
				<pt-stack [direction]="direction" gap="sm">
					@for (i of [1, 2, 3]; track i) {
						<pt-surface variant="subtle" padding="sm" radius="sm">
							<pt-text variant="body-md">{{ i }}</pt-text>
						</pt-surface>
					}
				</pt-stack>
			</div>
		}
	`,
	styles: [`
		:host {
			display: flex;
			gap: 24px;
		}
		.demo-container {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	`],
})
export class StackDirectionDemoComponent {
	readonly directions = ['vertical', 'horizontal'] as const;
}
