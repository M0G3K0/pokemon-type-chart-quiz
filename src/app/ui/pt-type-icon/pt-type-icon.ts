import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../pt-icon/pt-icon';
import { PokemonType } from '../../domain/type-chart';

/**
 * Type Icon component for displaying Pokemon type with styled background
 * 
 * @example
 * <pt-type-icon [type]="'fire'" size="md"></pt-type-icon>
 * 
 * @reference
 * - Atomic Design: Molecule (Semantic component wrapping pt-icon)
 */
@Component({
  selector: 'pt-type-icon',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './pt-type-icon.html',
  styleUrls: ['./pt-type-icon.scss'],
})
export class TypeIconComponent {
  /**
   * Pokemon type
   */
  @Input({ required: true }) type!: PokemonType;

  /**
   * Size of the type icon
   * @default 'md'
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /**
   * Get icon path for the Pokemon type
   */
  get iconPath(): string {
    return `/icons/${this.type}.svg`;
  }

  /**
   * Get background color CSS variable for the Pokemon type
   */
  get bgColor(): string {
    return `var(--pt-color-pokemon-${this.type}-500)`;
  }
}
