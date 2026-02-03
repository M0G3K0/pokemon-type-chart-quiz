import { Component } from '@angular/core';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Surface Border Radius
 */
@Component({
	selector: 'surface-radius-demo',
	standalone: true,
	imports: [SurfaceComponent, TextComponent],
	template: `
		@for (radius of radiuses; track radius) {
			<pt-surface variant="subtle" padding="md" [radius]="radius" [border]="true">
				<pt-text variant="body-md">{{ radius }}</pt-text>
			</pt-surface>
		}
	`,
})
export class SurfaceRadiusDemoComponent {
	readonly radiuses = ['none', 'sm', 'md', 'lg', 'xl', 'full'] as const;
}
