import { Component } from '@angular/core';
import { GridComponent } from '@ui/pt-grid/pt-grid';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Grid Columns
 */
@Component({
	selector: 'grid-columns-demo',
	standalone: true,
	imports: [GridComponent, SurfaceComponent, TextComponent],
	template: `
		@for (columns of columnOptions; track columns) {
			<div class="demo-container">
				<pt-text variant="label-sm" color="secondary">columns={{ columns }}</pt-text>
				<pt-grid [columns]="columns" gap="sm">
					@for (i of getItems(columns); track i) {
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
export class GridColumnsDemoComponent {
	readonly columnOptions = [2, 3, 4] as const;

	getItems(columns: number): number[] {
		return Array.from({ length: columns }, (_, i) => i + 1);
	}
}
