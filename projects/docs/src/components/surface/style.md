---
title: Style
route: style
---

## Design Tokens

`pt-surface`は以下のデザイントークンを使用します。

### Variant

| Variant | Background | Shadow | 用途 |
|---------|------------|--------|------|
| `default` | 白 | なし | 標準背景 |
| `subtle` | 薄いグレー | なし | セクション区分け |
| `card` | 白 | あり | 浮いたカード風 |
| `ghost` | 透明 | なし | 親の背景を透過 |

### Padding

| Token | Reference | 用途 |
|-------|-----------|------|
| `surface.padding.none` | `0` | パディングなし |
| `surface.padding.sm` | `{spacing.content.sm}` | コンパクト |
| `surface.padding.md` | `{spacing.content.md}` | 標準 |
| `surface.padding.lg` | `{spacing.content.lg}` | ゆったり |

### Border Radius

| Token | Reference | 用途 |
|-------|-----------|------|
| `surface.radius.none` | `0` | 角丸なし |
| `surface.radius.sm` | `{radius.sm}` | 小さい角丸 |
| `surface.radius.md` | `{radius.md}` | 標準角丸 |
| `surface.radius.lg` | `{radius.lg}` | 大きい角丸 |
| `surface.radius.xl` | `{radius.xl}` | 特大角丸 |
| `surface.radius.full` | `{radius.full}` | 完全円形 |

---

## Related Tokens

- `design-tokens/tier3-component/surface.json`: コンポーネントトークン定義
