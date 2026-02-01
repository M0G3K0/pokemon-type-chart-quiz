import { Component } from '@angular/core';
import { AvatarComponent } from '@ui/pt-avatar/pt-avatar';

/**
 * Demo: Avatar Shapes
 * 背景色を付けることで、各shapeの角丸の違いを可視化
 */
@Component({
	selector: 'avatar-shapes-demo',
	standalone: true,
	imports: [AvatarComponent],
	template: `
		@for (shape of shapes; track shape) {
			<div class="avatar-wrapper">
				<pt-avatar
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
					[alt]="'ピカチュウ ' + shape"
					size="lg"
					[shape]="shape"
				></pt-avatar>
				<span class="shape-label">{{ shape }}</span>
			</div>
		}
	`,
	styles: `
		:host {
			display: flex;
			gap: 24px;
			align-items: flex-start;
		}
		.avatar-wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 8px;
		}
		.avatar-wrapper pt-avatar ::ng-deep .pt-avatar {
			background-color: var(--pt-color-gray-200);
		}
		.shape-label {
			font-size: 14px;
			font-weight: 500;
			color: var(--pt-color-text-secondary);
		}
	`,
})
export class AvatarShapesDemoComponent {
	readonly shapes = ['circle', 'rounded', 'square'] as const;
}
