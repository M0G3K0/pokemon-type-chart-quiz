import { Component, Input } from '@angular/core';
import { GridComponent } from '@ui/pt-grid/pt-grid';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Playground wrapper for Grid
 */
@Component({
	selector: 'grid-playground',
	standalone: true,
	imports: [GridComponent, SurfaceComponent, TextComponent],
	template: `
		<pt-grid
			[columns]="columns"
			[smColumns]="smColumns"
			[gap]="gap"
		>
			@for (i of [1, 2, 3, 4, 5, 6]; track i) {
				<pt-surface variant="subtle" padding="md" radius="sm">
					<pt-text variant="body-md" align="center">{{ i }}</pt-text>
				</pt-surface>
			}
		</pt-grid>
	`,
})
export class GridPlaygroundComponent {
	@Input() columns: 1 | 2 | 3 | 4 | 6 = 3;
	@Input() smColumns?: 1 | 2 | 3 | 4 | 6;
	@Input() gap: 'none' | 'sm' | 'md' | 'lg' = 'md';
}
