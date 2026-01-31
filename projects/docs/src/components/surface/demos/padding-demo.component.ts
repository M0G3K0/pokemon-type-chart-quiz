import { Component } from '@angular/core';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Surface Padding
 */
@Component({
	selector: 'surface-padding-demo',
	standalone: true,
	imports: [SurfaceComponent, TextComponent],
	template: `
		@for (padding of paddings; track padding) {
			<pt-surface variant="subtle" [padding]="padding" radius="md" [border]="true">
				<pt-text variant="body-md">padding={{ padding }}</pt-text>
			</pt-surface>
		}
	`,
})
export class SurfacePaddingDemoComponent {
	readonly paddings = ['none', 'sm', 'md', 'lg'] as const;
}
