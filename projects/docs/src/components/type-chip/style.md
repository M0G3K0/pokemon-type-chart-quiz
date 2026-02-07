---
title: Style
route: style
---

## Design Tokens

`pt-type-chip`は以下のデザイントークンを使用します。


<!-- @auto-generated:token-table:start -->
### Color

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `text` | `--pt-type-chip-color-text` | `{color.text.inverse}` |  | タイプチップのデフォルトテキスト色。`color`に適用。 |
<!-- @auto-generated:token-table:end -->
## Layout Specifications

`pt-chip`から継承されるサイズ仕様：

| Size | Height | Padding (horizontal) | Gap | Font Size |
|------|--------|---------------------|-----|-----------|
| `sm` | 24px | 8px | 4px | 12px |
| `md` | 32px | 12px | 6px | 14px |
| `lg` | 40px | 16px | 8px | 16px |

> ⚠️ **Note**: 現在これらの値はハードコードされています。`chip.json`コンポーネントトークン作成後、トークン参照に置き換わる予定です（Issue #94）。

---

## Border Radius

| Rounded | Value |
|---------|-------|
| `none` | 0 |
| `sm` | 4px |
| `md` | 8px |
| `full` | 9999px |

---

## Related Tokens

- `pt-chip`: 汎用Chipのスタイル仕様を参照
- `design-tokens/tier2-semantic/pokemon.json`: ポケモンタイプカラー定義
