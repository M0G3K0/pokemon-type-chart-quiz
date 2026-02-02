import { Component, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';
import type { IconColor } from '@ui/pt-icon/pt-icon.types';

/**
 * Demo: Icon Type Icons
 */
@Component({
	selector: 'icon-types-demo',
	standalone: true,
	imports: [IconComponent],
	template: `
		@for (type of types; track type) {
			<pt-icon [src]="getIconPath(type)" size="md" [color]="type"></pt-icon>
		}
	`,
})
export class IconTypesDemoComponent {
	private readonly assetPath = inject(AssetPathService);
	readonly types: IconColor[] = ['fire', 'water', 'grass', 'electric', 'ice', 'fighting'];

	getIconPath(type: string): string {
		return this.assetPath.icon(type);
	}
}
