import { Component } from '@angular/core';
import { StackComponent } from '@ui/pt-stack/pt-stack';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Stack Gap
 */
@Component({
	selector: 'stack-gap-demo',
	standalone: true,
	imports: [StackComponent, SurfaceComponent, TextComponent],
	template: `
		@for (gap of gaps; track gap) {
			<div class="demo-container">
				<pt-text variant="label-sm" color="secondary">gap={{ gap }}</pt-text>
				<pt-stack direction="horizontal" [gap]="gap">
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
			flex-direction: column;
			gap: 16px;
		}
		.demo-container {
			display: flex;
			flex-direction: column;
			gap: 4px;
		}
	`],
})
export class StackGapDemoComponent {
	readonly gaps = ['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
}
