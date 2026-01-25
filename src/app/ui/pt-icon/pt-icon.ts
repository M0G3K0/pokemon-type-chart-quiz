import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Icon component for displaying SVG or image-based icons
 * 
 * @example
 * <pt-icon [src]="'/icons/fire.svg'" size="md" [bgColor]="'red'" [rounded]="true"></pt-icon>
 * 
 * @reference
 * - GitHub Primer: https://primer.style/design/components/icon
 * - Material Design 3: https://m3.material.io/styles/icons/overview
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
   * Icon name for SVG library (future implementation)
   */
  @Input() name?: string;

  /**
   * Image URL for icon
   */
  @Input() src?: string;

  /**
   * Size of the icon
   * @default 'md'
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Icon color (for SVG icons)
   */
  @Input() color?: string;

  /**
   * Background color
   */
  @Input() bgColor?: string;

  /**
   * Make background circular
   * @default false
   */
  @Input() rounded = false;
}
