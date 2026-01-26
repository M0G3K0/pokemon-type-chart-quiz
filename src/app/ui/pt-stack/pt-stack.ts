import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Stack component for flexbox-based layouts
 *
 * @example
 * <pt-stack direction="vertical" gap="lg" align="center">
 *   <pt-avatar ...></pt-avatar>
 *   <h2>ピカチュウ</h2>
 * </pt-stack>
 *
 * @reference
 * - Chakra UI Stack: https://chakra-ui.com/docs/components/stack
 * - Material UI Stack: https://mui.com/material-ui/react-stack/
 */
@Component({
	selector: 'pt-stack',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pt-stack.html',
	styleUrls: ['./pt-stack.scss'],
})
export class StackComponent {
	/**
	 * Stacking direction
	 * - vertical: column
	 * - horizontal: row
	 * - responsive: column on mobile, row on sm+
	 * @default 'vertical'
	 */
	@Input() direction: 'vertical' | 'horizontal' | 'responsive' = 'vertical';

	/**
	 * Gap between items
	 * @default 'md'
	 */
	@Input() gap: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

	/**
	 * Align items on cross axis
	 * @default 'stretch'
	 */
	@Input() align: 'start' | 'center' | 'end' | 'stretch' = 'stretch';

	/**
	 * Justify content on main axis
	 * @default 'start'
	 */
	@Input() justify: 'start' | 'center' | 'end' | 'between' = 'start';
}
