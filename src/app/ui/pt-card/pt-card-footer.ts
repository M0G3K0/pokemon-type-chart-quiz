import { Component } from '@angular/core';

/**
 * カードフッターコンポーネント
 *
 * カードのアクションエリア。
 * ボタンやリンクなどの操作要素を配置する。
 *
 * @example
 * ```html
 * <pt-card>
 *   <pt-card-content>...</pt-card-content>
 *   <pt-card-footer>
 *     <pt-button>保存</pt-button>
 *     <pt-button variant="ghost">キャンセル</pt-button>
 *   </pt-card-footer>
 * </pt-card>
 * ```
 */
@Component({
	selector: 'pt-card-footer',
	standalone: true,
	template: `<ng-content></ng-content>`,
	styles: `
    :host {
      display: flex;
      gap: var(--pt-space-sm);
      padding: var(--pt-space-md);
      border-top: 1px solid var(--pt-color-border-subtle);
      justify-content: flex-end;
    }
  `,
})
export class CardFooterComponent { }
