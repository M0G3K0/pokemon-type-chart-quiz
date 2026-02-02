import { Component, Input, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';

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
			[alt]="alt"
		></pt-icon>
	`,
})
export class IconPlaygroundComponent {
	private readonly assetPath = inject(AssetPathService);

	@Input() iconName = 'fire';
	@Input() size: 'sm' | 'md' | 'lg' = 'md';
	@Input() alt = '';

	get iconPath(): string {
		// NgDoc Playground may pass undefined for iconName before user selection
		return this.assetPath.icon(this.iconName || 'fire');
	}
}
