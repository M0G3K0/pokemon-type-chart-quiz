import { Component, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';

/**
 * Demo: Icon Sizes
 */
@Component({
	selector: 'icon-sizes-demo',
	standalone: true,
	imports: [IconComponent],
	template: `
		@for (size of sizes; track size) {
			<div class="icon-demo-wrapper">
				<pt-icon [src]="iconPath" [size]="size"></pt-icon>
			</div>
		}
	`,
	styles: `
		.icon-demo-wrapper {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: var(--pt-space-2);
			background: var(--pt-color-pokemon-fire-500);
			border-radius: var(--pt-border-radius-md);
		}
	`,
})
export class IconSizesDemoComponent {
	private readonly assetPath = inject(AssetPathService);
	readonly sizes = ['sm', 'md', 'lg'] as const;

	get iconPath(): string {
		return this.assetPath.icon('fire');
	}
}

