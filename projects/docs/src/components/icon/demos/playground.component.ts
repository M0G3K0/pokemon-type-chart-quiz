import { Component, Input, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';
import type { IconSize, IconColor } from '@ui/pt-icon/pt-icon.types';
import type { PokemonType } from '@domain/type-chart';

/**
 * Playground wrapper for Icon
 */
@Component({
	selector: 'icon-playground',
	standalone: true,
	imports: [IconComponent],
	template: `
		<pt-icon
			[src]="iconPath"
			[size]="size"
			[color]="color"
			[alt]="alt"
		></pt-icon>
	`,
})
export class IconPlaygroundComponent {
	private readonly assetPath = inject(AssetPathService);

	@Input() iconName: PokemonType = 'fire';
	@Input() size: IconSize = 'md';
	@Input() color: IconColor = 'fire';
	@Input() alt = '';

	get iconPath(): string {
		// NgDoc Playground may pass undefined for iconName before user selection
		return this.assetPath.icon(this.iconName || 'fire');
	}
}
