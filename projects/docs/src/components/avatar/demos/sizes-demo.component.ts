import { Component } from '@angular/core';
import { AvatarComponent } from '@ui/pt-avatar/pt-avatar';

/**
 * Demo: Avatar Sizes
 */
@Component({
	selector: 'avatar-sizes-demo',
	standalone: true,
	imports: [AvatarComponent],
	template: `
		@for (size of sizes; track size) {
			<pt-avatar
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
				[alt]="'ピカチュウ ' + size"
				[size]="size"
			></pt-avatar>
		}
	`,
})
export class AvatarSizesDemoComponent {
	readonly sizes = ['sm', 'md', 'lg', 'xl'] as const;
}
