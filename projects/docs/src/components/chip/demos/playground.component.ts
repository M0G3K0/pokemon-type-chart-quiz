import { Component, Input } from '@angular/core';
import { ChipComponent } from '@ui/pt-chip/pt-chip';

/**
 * Playground wrapper for ChipComponent
 * Only essential inputs exposed for interactive experimentation
 */
@Component({
	selector: 'chip-playground',
	standalone: true,
	imports: [ChipComponent],
	template: `
		<pt-chip
			[size]="size"
			[rounded]="rounded"
			[bgColor]="'var(--pt-color-surface-pressed)'"
			[textColor]="'var(--pt-color-text-primary)'"
		>
			Chip
		</pt-chip>
	`,
})
export class ChipPlaygroundComponent {
	/**
	 * Chip size
	 */
	@Input() size: 'sm' | 'md' = 'md';

	/**
	 * Border radius
	 */
	@Input() rounded: 'none' | 'sm' | 'md' | 'full' = 'md';
}
