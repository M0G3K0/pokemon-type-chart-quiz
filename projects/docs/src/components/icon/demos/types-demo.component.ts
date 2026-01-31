import { Component, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';

/**
 * Demo: Icon Type Icons
 */
@Component({
	selector: 'icon-types-demo',
	standalone: true,
	imports: [IconComponent],
	template: `
		@for (type of types; track type) {
			<pt-icon [src]="getIconPath(type)" size="md"></pt-icon>
		}
	`,
})
export class IconTypesDemoComponent {
	private readonly assetPath = inject(AssetPathService);
	readonly types = ['fire', 'water', 'grass', 'electric', 'ice', 'fighting'] as const;

	getIconPath(type: string): string {
		return this.assetPath.icon(type);
	}
}
