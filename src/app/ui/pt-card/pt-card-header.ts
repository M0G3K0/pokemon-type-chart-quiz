import { Component } from '@angular/core';

/**
 * カードヘッダーコンポーネント
 *
 * カードのタイトル・見出しエリア。
 * 下部にボーダーを持ち、コンテンツと視覚的に分離される。
 *
 * @example
 * ```html
 * <pt-card>
 *   <pt-card-header>
 *     <h2>タイトル</h2>
 *   </pt-card-header>
 *   <pt-card-content>...</pt-card-content>
 * </pt-card>
 * ```
 */
@Component({
	selector: 'pt-card-header',
	standalone: true,
	template: `<ng-content></ng-content>`,
	styles: `
    :host {
      display: block;
      padding: var(--pt-space-md);
      border-bottom: 1px solid var(--pt-color-border-subtle);
    }
  `,
})
export class CardHeaderComponent { }
