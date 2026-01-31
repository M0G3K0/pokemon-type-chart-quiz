import { Component, Input } from '@angular/core';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Playground wrapper for Surface
 */
@Component({
	selector: 'surface-playground',
	standalone: true,
	imports: [SurfaceComponent, TextComponent],
	template: `
		<pt-surface
			[variant]="variant"
			[padding]="padding"
			[radius]="radius"
			[border]="border"
		>
			<pt-text variant="body-md">{{ content }}</pt-text>
		</pt-surface>
	`,
})
export class SurfacePlaygroundComponent {
	@Input() content = 'コンテンツ';
	@Input() variant: 'default' | 'subtle' | 'card' | 'ghost' = 'default';
	@Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
	@Input() radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
	@Input() border = false;
}
