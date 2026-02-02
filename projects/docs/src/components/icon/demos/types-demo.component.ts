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
			<div class="icon-demo-wrapper" [style.background]="getTypeColor(type)">
				<pt-icon [src]="getIconPath(type)" size="md"></pt-icon>
			</div>
		}
	`,
	styles: `
		.icon-demo-wrapper {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			padding: var(--pt-space-2);
			border-radius: var(--pt-border-radius-md);
		}
	`,
})
export class IconTypesDemoComponent {
	private readonly assetPath = inject(AssetPathService);
	readonly types = ['fire', 'water', 'grass', 'electric', 'ice', 'fighting'] as const;

	getIconPath(type: string): string {
		return this.assetPath.icon(type);
	}

	getTypeColor(type: string): string {
		return `var(--pt-color-pokemon-${type}-500)`;
	}
}

