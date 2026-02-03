import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSize, IconColor } from './pt-icon.types';

/**
 * Icon component for displaying icons with optional color support
 *
 * @example
 * <!-- Type color -->
 * <pt-icon [src]="'/icons/fire.svg'" size="md" color="fire"></pt-icon>
 *
 * <!-- Inverse (white) for dark backgrounds -->
 * <pt-icon [src]="'/icons/fire.svg'" size="md" color="inverse"></pt-icon>
 *
 * <!-- Inherit parent color (default) -->
 * <pt-icon [src]="'/icons/fire.svg'" size="md"></pt-icon>
 *
 * @reference
 * - Atomic Design: Atom (Generic component)
 * - GitHub Primer: https://primer.style/components/icon
 * - SmartHR Design System: https://smarthr.design/products/components/icon/
 */
@Component({
  selector: 'pt-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pt-icon.html',
  styleUrls: ['./pt-icon.scss'],
})
export class IconComponent {
  /**
   * Image URL for icon
   */
  @Input({ required: true }) src!: string;

  /**
   * Size of the icon
   * @default 'md'
   */
  @Input() size: IconSize = 'md';

  /**
   * Alternative text for accessibility
   * @default '' (decorative icon)
   */
  @Input() alt = '';

  /**
   * Color of the icon
   * - PokemonType: Applies the type's color (e.g., 'fire', 'water')
   * - 'inverse': White color for dark backgrounds
   * - undefined: Inherits parent color via currentColor (default)
   */
  @Input() color?: IconColor;

  /**
   * Icon element classes
   */
  get iconClasses(): string[] {
    return ['pt-icon', `pt-icon--${this.size}`];
  }

  /**
   * Computed color value for CSS mask mode
   * Returns CSS variable or null if no color is set
   */
  get iconColor(): string | null {
    if (!this.color) return null;
    if (this.color === 'inverse') return 'var(--pt-color-text-inverse)';
    return `var(--pt-color-pokemon-${this.color}-500)`;
  }

  /**
   * CSS mask-image URL for color mode
   */
  get maskImageUrl(): string {
    return `url(${this.src})`;
  }
}
