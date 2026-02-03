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
			<pt-icon [src]="iconPath" [size]="size" color="fire"></pt-icon>
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
