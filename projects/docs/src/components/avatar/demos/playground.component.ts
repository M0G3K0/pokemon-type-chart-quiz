import { Component, Input } from '@angular/core';
import { AvatarComponent, AvatarSize, AvatarShape } from '@ui/pt-avatar/pt-avatar';

/**
 * Playground wrapper for Avatar
 */
@Component({
	selector: 'avatar-playground',
	standalone: true,
	imports: [AvatarComponent],
	template: `
		<pt-avatar
			[src]="src"
			[alt]="alt"
			[size]="size"
			[shape]="shape"
			[pixelated]="pixelated"
		></pt-avatar>
	`,
})
export class AvatarPlaygroundComponent {
	@Input() src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png';
	@Input() alt = 'ピカチュウ';
	@Input() size: AvatarSize = 'md';
	@Input() shape: AvatarShape = 'circle';
	@Input() pixelated = false;
}
