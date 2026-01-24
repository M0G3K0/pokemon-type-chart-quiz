import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * バッジコンポーネント
 * 
 * ステータス、カテゴリ、ラベルを視覚的に表現する自己完結型コンポーネント。
 * 短いテキストやアイコンと組み合わせて使用する。
 * 
 * @example
 * ```html
 * <pt-badge color="success" size="md">完了</pt-badge>
 * <pt-badge color="warning" size="sm">注意</pt-badge>
 * <pt-badge [customColor]="'#ee8130'" size="md">カスタム</pt-badge>
 * ```
 */
@Component({
  selector: 'pt-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      [class]="badgeClasses"
      [style.background-color]="backgroundColor"
      [style.color]="textColor"
    >
      <ng-content></ng-content>
    </span>
  `,
  styleUrl: './pt-badge.scss',
})
export class BadgeComponent {
  /** 
   * プリセットカラー
   * semantic tokensに対応
   */
  @Input() color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral' = 'neutral';

  /** 
   * カスタムカラー（CSS color値）
   * colorプロパティより優先される
   */
  @Input() customColor?: string;

  /** バッジのサイズ */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get badgeClasses(): string {
    return [
      'pt-badge',
      `pt-badge--${this.size}`,
    ].join(' ');
  }

  get backgroundColor(): string {
    if (this.customColor) {
      return this.customColor;
    }

    const colorMap: Record<string, string> = {
      primary: 'var(--color-action-primary-default)',
      secondary: 'var(--color-action-secondary-default)',
      success: 'var(--color-feedback-success-default)',
      warning: 'var(--color-feedback-warning-default)',
      error: 'var(--color-feedback-error-default)',
      info: 'var(--color-feedback-info-default)',
      neutral: 'var(--color-slate-500)',
    };

    return colorMap[this.color] ?? colorMap['neutral'];
  }

  get textColor(): string {
    return 'var(--color-text-inverse)';
  }
}
