import { Component } from '@angular/core';
import { GridComponent } from '@ui/pt-grid/pt-grid';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Grid Responsive
 */
@Component({
	selector: 'grid-responsive-demo',
	standalone: true,
	imports: [GridComponent, SurfaceComponent, TextComponent],
	template: `
		<pt-text variant="label-sm" color="secondary">
			モバイル: 2列 / デスクトップ(640px以上): 3列
		</pt-text>
		<pt-grid [columns]="2" [smColumns]="3" gap="md">
			@for (i of [1, 2, 3, 4, 5, 6]; track i) {
				<pt-surface variant="subtle" padding="md" radius="sm">
					<pt-text variant="body-md" align="center">{{ i }}</pt-text>
				</pt-surface>
			}
		</pt-grid>
	`,
	styles: [`
		:host {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
	`],
})
export class GridResponsiveDemoComponent { }
