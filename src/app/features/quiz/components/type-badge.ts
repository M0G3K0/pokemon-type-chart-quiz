import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../../../ui/pt-badge/pt-badge';

/**
 * ポケモンタイプ専用バッジコンポーネント
 * 
 * 汎用pt-badgeをラップして、ポケモンタイプ固有のスタイリングを適用する。
 * デザインシステム層ではなくアプリケーション層のコンポーネント。
 */
@Component({
	selector: 'app-type-badge',
	standalone: true,
	imports: [BadgeComponent],
	template: `
    <pt-badge 
      [customColor]="typeColor" 
      [size]="size"
    >
      <ng-content></ng-content>
    </pt-badge>
  `,
	styles: [`
    :host {
      display: inline-block;
    }
  `],
})
export class TypeBadgeComponent {
	/** ポケモンのタイプ（英語） */
	@Input() type = 'normal';

	/** バッジのサイズ */
	@Input() size: 'sm' | 'md' | 'lg' = 'md';

	get typeColor(): string {
		return `var(--color-pokemon-type-${this.type.toLowerCase()})`;
	}
}
