---
title: Style
route: style
---

## Design Tokens

`pt-heading`は以下のデザイントークンを使用します。

### Size Tokens

| Size | Typography Token | 用途 |
|------|------------------|------|
| `xl` | `typography.heading.xl` | 画面タイトル (1ページに1回のみ) |
| `lg` | `typography.heading.lg` | セクションタイトル |
| `md` | `typography.heading.md` | ブロックタイトル |
| `sm` | `typography.heading.sm` | サブ・ブロックタイトル |

### Level → Size 自動推論

| Level | Default Size | HTML Element |
|-------|--------------|--------------|
| 1 | `xl` | `<h1>` |
| 2 | `lg` | `<h2>` |
| 3 | `md` | `<h3>` |
| 4-6 | `sm` | `<h4>`-`<h6>` |

---

## Accent Bar

アクセントバーはセクションの開始を視覚的に強調します。

| Visual Attribute | Token | Value |
|-----------------|-------|-------|
| バーの幅 | `--pt-heading-accent-width` | `4px` |
| バーの色 | `--pt-heading-accent-color` | `{color.primary}` |
| 左余白 | `--pt-heading-accent-gap` | `{spacing.3}` |

---

## Related Tokens

- `design-tokens/tier3-component/heading.json`: コンポーネントトークン定義
- `design-tokens/tier2-semantic/typography.json`: タイポグラフィトークン
