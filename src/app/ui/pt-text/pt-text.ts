import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	type TextVariant,
	type TextColor,
	type TextWeight,
	type TextTransform,
	type TextAlign,
	type TextElement,
	buildTextClasses,
} from './pt-text.logic';

export type { TextVariant, TextColor, TextWeight, TextTransform, TextAlign, TextElement };
export { buildTextClasses };

/**
 * pt-text (Atom): 本文・ラベル・補助テキスト用のタイポグラフィコンポーネント
 *
 * Design Tokens (Tier 2/3) に定義されたスタイルを一貫して適用。
 * 独自CSSクラス（.quiz-phase-label 等）の撲滅を目的とする。
 *
 * セマンティックな見出し（h1-h6）が必要な場合は pt-heading を使用すること。
 *
 * @example
 * ```html
 * <!-- 標準本文 -->
 * <pt-text>これは標準の本文テキストです。</pt-text>
 *
 * <!-- メタラベル -->
 * <pt-text variant="label-xs" color="secondary" transform="uppercase">
 *   Phase 0: Battle Trial
 * </pt-text>
 *
 * <!-- 強調テキスト -->
 * <pt-text variant="body-lg" weight="bold">{{ pokemon.name }}</pt-text>
 * ```
 *
 * @see pt-heading - 構造的な見出しが必要な場合
 * @see https://primer.style/components/text - GitHub Primer Text
 * @see https://smarthr.design/products/components/text/ - SmartHR Text
 */
@Component({
	selector: 'pt-text',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pt-text.html',
	styleUrls: ['./pt-text.scss'],
})
export class TextComponent {
	/**
	 * テキストのセマンティックなバリエーション
	 * - body-lg: リードパラグラフ、強調説明文
	 * - body-md: 標準本文 (default)
	 * - body-sm: 注釈、メタ情報
	 * - label-md: ボタン、ナビゲーション
	 * - label-sm: タグ、バッジ
	 * - label-xs: メタデータ、ステータス
	 */
	@Input() variant: TextVariant = 'body-md';

	/**
	 * テキストの色
	 * - primary: メインテキスト (default)
	 * - secondary: 補助テキスト
	 * - disabled: 無効状態
	 * - inverse: 反転（暗い背景上）
	 * - danger: エラー・警告
	 */
	@Input() color: TextColor = 'primary';

	/**
	 * フォントの太さ（オプション）
	 * 指定しない場合は variant のデフォルトを使用。
	 */
	@Input() weight?: TextWeight;

	/**
	 * テキスト変換
	 */
	@Input() transform: TextTransform = 'none';

	/**
	 * 出力するHTML要素
	 * - span: インライン (default)
	 * - p: パラグラフ
	 * - div: ブロック
	 * - label: フォームラベル
	 */
	@Input() element: TextElement = 'span';

	/**
	 * イタリック体
	 */
	@Input() italic = false;

	/**
	 * テキスト揃え
	 */
	@Input() align: TextAlign = 'start';

	/**
	 * 動的クラス生成
	 */
	get textClasses(): Record<string, boolean> {
		return buildTextClasses({
			variant: this.variant,
			color: this.color,
			weight: this.weight,
			transform: this.transform,
			italic: this.italic,
			align: this.align,
		});
	}
}
