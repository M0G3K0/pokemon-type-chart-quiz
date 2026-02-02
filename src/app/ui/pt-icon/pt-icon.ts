import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Icon component for displaying icons
 * 
 * @example
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
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Alternative text for accessibility
   * @default '' (decorative icon)
   */
  @Input() alt = '';

  /**
   * Icon element classes
   */
  get iconClasses(): string[] {
    return ['pt-icon', `pt-icon--${this.size}`];
  }
}
