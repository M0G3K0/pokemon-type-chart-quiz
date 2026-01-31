import { Component } from '@angular/core';
import { SurfaceComponent } from '@ui/pt-surface/pt-surface';
import { TextComponent } from '@ui/pt-text/pt-text';

/**
 * Demo: Surface Variants
 */
@Component({
	selector: 'surface-variants-demo',
	standalone: true,
	imports: [SurfaceComponent, TextComponent],
	template: `
		@for (variant of variants; track variant) {
			<pt-surface [variant]="variant" padding="md" radius="md">
				<pt-text variant="body-md">{{ variant }}</pt-text>
			</pt-surface>
		}
	`,
	styles: [`
		:host {
			display: flex;
			gap: 16px;
			padding: 16px;
			background: #f5f5f5;
		}
	`],
})
export class SurfaceVariantsDemoComponent {
	readonly variants = ['default', 'subtle', 'card', 'ghost'] as const;
}
