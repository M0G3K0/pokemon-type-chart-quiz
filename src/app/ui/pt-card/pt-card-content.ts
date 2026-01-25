import { Component } from '@angular/core';

/**
 * カードコンテンツコンポーネント
 *
 * カードのメインコンテンツエリア。
 * 本文、説明文、フォームなどを配置する。
 *
 * @example
 * ```html
 * <pt-card>
 *   <pt-card-header>...</pt-card-header>
 *   <pt-card-content>
 *     <p>本文テキスト</p>
 *   </pt-card-content>
 * </pt-card>
 * ```
 */
@Component({
	selector: 'pt-card-content',
	standalone: true,
	template: `<ng-content></ng-content>`,
	styles: `
    :host {
      display: block;
      padding: var(--pt-space-md);
    }
  `,
})
export class CardContentComponent { }
