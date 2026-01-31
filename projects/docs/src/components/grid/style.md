---
title: Style
route: style
---

## Design Tokens

`pt-grid`は以下のデザイントークンを使用します。

### Columns

| Columns | 用途 |
|---------|------|
| `1` | モバイル単一カラム |
| `2` | 選択肢ペア、2択ボタン |
| `3` | Quiz選択肢（デスクトップ） |
| `4` | ギャラリー、アイコン群 |
| `6` | 高密度レイアウト |

### Gap

| Token | Reference | Value | 用途 |
|-------|-----------|-------|------|
| `grid.gap.none` | - | `0` | ギャップなし |
| `grid.gap.sm` | `{spacing.gap.sm}` | 8px | コンパクト |
| `grid.gap.md` | `{spacing.gap.md}` | 16px | 標準（default） |
| `grid.gap.lg` | `{spacing.gap.lg}` | 24px | ゆったり |

---

## Related Tokens

- `design-tokens/tier3-component/grid.json`: コンポーネントトークン定義
