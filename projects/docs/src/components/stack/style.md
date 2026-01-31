---
title: Style
route: style
---

## Design Tokens

`pt-stack`は以下のデザイントークンを使用します。

### Gap

| Token | Reference | Value | 用途 |
|-------|-----------|-------|------|
| `stack.gap.none` | - | `0` | 密着配置 |
| `stack.gap.xs` | `{spacing.gap.xs}` | 4px | 密接な要素間 |
| `stack.gap.sm` | `{spacing.gap.sm}` | 8px | 関連要素間 |
| `stack.gap.md` | `{spacing.gap.md}` | 16px | 標準（default） |
| `stack.gap.lg` | `{spacing.gap.lg}` | 24px | セクション内区切り |
| `stack.gap.xl` | `{spacing.content.xl}` | 32px | 明確な分割 |

### Direction

| Direction | flex-direction | 用途 |
|-----------|----------------|------|
| `vertical` | `column` | 縦積み（デフォルト） |
| `horizontal` | `row` | 横並び |
| `responsive` | `column` → `row` | モバイル縦、デスクトップ横 |

### Align (cross-axis)

| Value | align-items | 用途 |
|-------|-------------|------|
| `start` | `flex-start` | 先頭揃え |
| `center` | `center` | 中央揃え |
| `end` | `flex-end` | 末尾揃え |
| `stretch` | `stretch` | 伸縮（デフォルト） |

### Justify (main-axis)

| Value | justify-content | 用途 |
|-------|-----------------|------|
| `start` | `flex-start` | 先頭揃え（デフォルト） |
| `center` | `center` | 中央揃え |
| `end` | `flex-end` | 末尾揃え |
| `between` | `space-between` | 両端揃え |

---

## Related Tokens

- `design-tokens/tier3-component/stack.json`: コンポーネントトークン定義
