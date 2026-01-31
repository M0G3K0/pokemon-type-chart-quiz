import { Component } from '@angular/core';
import { GridComponent } from '@ui/pt-grid/pt-grid';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Grid Gap
 */
@Component({
	selector: 'grid-gap-demo',
	standalone: true,
	imports: [GridComponent, SurfaceComponent, TextComponent],
	template: `
		@for (gap of gaps; track gap) {
			<div class="demo-container">
				<pt-text variant="label-sm" color="secondary">gap={{ gap }}</pt-text>
				<pt-grid [columns]="3" [gap]="gap">
					@for (i of [1, 2, 3]; track i) {
						<pt-surface variant="subtle" padding="sm" radius="sm">
							<pt-text variant="body-md" align="center">{{ i }}</pt-text>
						</pt-surface>
					}
				</pt-grid>
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
export class GridGapDemoComponent {
	readonly gaps = ['none', 'sm', 'md', 'lg'] as const;
}
