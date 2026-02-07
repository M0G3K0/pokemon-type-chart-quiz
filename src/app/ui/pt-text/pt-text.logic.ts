/**
 * @what  pt-text の CSS クラス生成ロジック（純粋関数）
 * @why   Angular DI に依存しないテスト可能な形で切り出す
 */

export type TextVariant = 'body-lg' | 'body-md' | 'body-sm' | 'label-md' | 'label-sm' | 'label-xs';
export type TextColor = 'primary' | 'secondary' | 'disabled' | 'inverse' | 'danger';
export type TextWeight = 'normal' | 'medium' | 'bold' | 'black';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';
export type TextAlign = 'start' | 'center' | 'end';
export type TextElement = 'span' | 'p' | 'div' | 'label';

export interface TextClassProps {
    variant: TextVariant;
    color: TextColor;
    weight?: TextWeight;
    transform: TextTransform;
    italic: boolean;
    align: TextAlign;
}

/**
 * pt-text の CSS クラスマップを生成する純粋関数
 */
export function buildTextClasses(props: TextClassProps): Record<string, boolean> {
    return {
        'pt-text': true,
        [`pt-text--${props.variant}`]: true,
        [`pt-text--color-${props.color}`]: true,
        [`pt-text--weight-${props.weight}`]: !!props.weight,
        [`pt-text--transform-${props.transform}`]: props.transform !== 'none',
        'pt-text--italic': props.italic,
        [`pt-text--align-${props.align}`]: props.align !== 'start',
    };
}
