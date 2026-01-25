import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * ボタンコンポーネント
 * 
 * 一貫したボタンUIを提供する自己完結型コンポーネント。
 * アクションの実行を促すUIに使用する。
 * 
 * @example
 * ```html
 * <pt-button variant="primary" size="md">送信</pt-button>
 * <pt-button variant="danger" size="sm" [disabled]="true">削除</pt-button>
 * ```
 */
@Component({
  selector: 'pt-button',
  standalone: true,
  template: `
    <button
      [class]="buttonClasses"
      [disabled]="disabled"
      (click)="handleClick($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styleUrl: './pt-button.scss',
})
export class ButtonComponent {
  /** ボタンの色バリエーション */
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';

  /** ボタンのサイズ */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** 無効状態 */
  @Input() disabled = false;

  /** クリックイベント */
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    return [
      'pt-button',
      `pt-button--${this.size}`,
      `pt-button--${this.variant}`,
    ].join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
