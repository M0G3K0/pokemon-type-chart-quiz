import { Component } from '@angular/core';
import { AvatarComponent } from '@ui/pt-avatar/pt-avatar';

/**
 * Demo: Avatar Pixelated Mode
 */
@Component({
	selector: 'avatar-pixelated-demo',
	standalone: true,
	imports: [AvatarComponent],
	template: `
		<pt-avatar
			src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
			alt="ピカチュウ（通常）"
			size="lg"
			shape="square"
			[pixelated]="false"
		></pt-avatar>
		<pt-avatar
			src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
			alt="ピカチュウ（ピクセルアート）"
			size="lg"
			shape="square"
			[pixelated]="true"
		></pt-avatar>
	`,
})
export class AvatarPixelatedDemoComponent { }
