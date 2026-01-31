import { Component } from '@angular/core';
import { AvatarComponent } from '@ui/pt-avatar/pt-avatar';

/**
 * Demo: Avatar Shapes
 */
@Component({
	selector: 'avatar-shapes-demo',
	standalone: true,
	imports: [AvatarComponent],
	template: `
		@for (shape of shapes; track shape) {
			<pt-avatar
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
				[alt]="'ピカチュウ ' + shape"
				size="lg"
				[shape]="shape"
			></pt-avatar>
		}
	`,
})
export class AvatarShapesDemoComponent {
	readonly shapes = ['circle', 'rounded', 'square'] as const;
}
