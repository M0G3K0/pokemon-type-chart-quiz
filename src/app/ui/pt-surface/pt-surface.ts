import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Surface component for container styling (background, border, radius, padding)
 *
 * @example
 * <pt-surface variant="subtle" padding="lg" radius="xl">
 *   <!-- content -->
 * </pt-surface>
 *
 * @reference
 * - Material UI Paper: https://mui.com/material-ui/react-paper/
 * - Radix UI Box: https://www.radix-ui.com/primitives
 */
@Component({
	selector: 'pt-surface',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pt-surface.html',
	styleUrls: ['./pt-surface.scss'],
})
export class SurfaceComponent {
	/**
	 * Visual variant
	 * - default: white background
	 * - subtle: light gray background
	 * - card: white with shadow
	 * - ghost: transparent
	 * @default 'default'
	 */
	@Input() variant: 'default' | 'subtle' | 'card' | 'ghost' = 'default';

	/**
	 * Inner padding
	 * @default 'md'
	 */
	@Input() padding: 'none' | 'sm' | 'md' | 'lg' = 'md';

	/**
	 * Border radius
	 * @default 'md'
	 */
	@Input() radius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

	/**
	 * Show border
	 * @default false
	 */
	@Input() border = false;

	/**
	 * Container element classes
	 */
	get containerClasses(): string[] {
		const classes = [
			'pt-surface',
			`pt-surface--${this.variant}`,
			`pt-surface--padding-${this.padding}`,
			`pt-surface--radius-${this.radius}`,
		];
		if (this.border) {
			classes.push('pt-surface--border');
		}
		return classes;
	}
}
