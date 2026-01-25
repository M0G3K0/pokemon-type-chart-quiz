import { Component, Input } from '@angular/core';

/**
 * カードコンポーネント
 * 
 * 関連するコンテンツをグループ化するコンテナ。
 * 情報の階層を視覚的に表現する。
 * 
 * @example
 * ```html
 * <pt-card size="md" elevation="raised">
 *   <h2>タイトル</h2>
 *   <p>コンテンツ</p>
 * </pt-card>
 * ```
 */
@Component({
  selector: 'pt-card',
  standalone: true,
  template: `
    <div [class]="cardClasses">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './pt-card.scss',
})
export class CardComponent {
  /** カードのパディングサイズ */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** カードの影の強さ */
  @Input() elevation: 'flat' | 'raised' | 'overlay' = 'raised';

  get cardClasses(): string {
    return [
      'pt-card',
      `pt-card--${this.size}`,
      `pt-card--${this.elevation}`,
    ].join(' ');
  }
}
