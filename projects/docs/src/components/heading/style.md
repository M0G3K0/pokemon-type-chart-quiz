---
title: Style
route: style
---

## Design Tokens

`pt-heading`は以下のデザイントークンを使用します。

### Text Color

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| テキスト色 | `--pt-heading-text-color` | `{color.text.primary}` |

---

## Typography (Font Aliases)

Phase 3e で導入された **Typography Alias Pattern** により、`pt-heading` は Tier 3 の `font.*` エイリアストークンを通じて Tier 2 タイポグラフィを参照します。

これにより **100% Tier 3 Isolation** を達成し、コンポーネントが直接 Tier 2 トークンを参照することを防いでいます。

### Size Tokens

| Size | Font Family | Font Size | Font Weight | Line Height |
|------|-------------|-----------|-------------|-------------|
| `xl` | `--pt-heading-font-xl-fontFamily` | `--pt-heading-font-xl-fontSize` | `--pt-heading-font-xl-fontWeight` | `--pt-heading-font-xl-lineHeight` |
| `lg` | `--pt-heading-font-lg-fontFamily` | `--pt-heading-font-lg-fontSize` | `--pt-heading-font-lg-fontWeight` | `--pt-heading-font-lg-lineHeight` |
| `md` | `--pt-heading-font-md-fontFamily` | `--pt-heading-font-md-fontSize` | `--pt-heading-font-md-fontWeight` | `--pt-heading-font-md-lineHeight` |
| `sm` | `--pt-heading-font-sm-fontFamily` | `--pt-heading-font-sm-fontSize` | `--pt-heading-font-sm-fontWeight` | `--pt-heading-font-sm-lineHeight` |

### Tier 2 Reference

各 Tier 3 トークンは対応する Tier 2 `typography.heading.*` を参照：

| Tier 3 Token | → | Tier 2 Reference |
|--------------|---|------------------|
| `heading.font.xl.fontSize` | → | `{typography.heading.xl.fontSize}` |
| `heading.font.lg.fontSize` | → | `{typography.heading.lg.fontSize}` |
| `heading.font.md.fontSize` | → | `{typography.heading.md.fontSize}` |
| `heading.font.sm.fontSize` | → | `{typography.heading.sm.fontSize}` |

---

## Level → Size 自動推論

| Level | Default Size | HTML Element |
|-------|--------------|--------------|
| 1 | `xl` | `<h1>` |
| 2 | `lg` | `<h2>` |
| 3 | `md` | `<h3>` |
| 4-6 | `sm` | `<h4>`-`<h6>` |

> **Level/Size 分離**: `level` はセマンティクス（文書構造）、`size` は視覚的サイズ。両者を独立して制御できます。

---

## Accent Bar

アクセントバーはセクションの開始を視覚的に強調します。

| Visual Attribute | Token (Tier 3) | Value |
|-----------------|----------------|-------|
| バーの幅 | `--pt-heading-accent-width` | `6px` |
| バーの高さ | `--pt-heading-accent-height` | `{space.6}` |
| バーの角丸 | `--pt-heading-accent-radius` | `{radius.full}` |
| バーとテキスト間隔 | `--pt-heading-accent-gap` | `{space.2}` |
| バーの色 | `--pt-heading-accent-color` | `{color.text.primary}` |

> **Note**: Phase 3e で `accent.color` が `{color.primary}` から `{color.text.primary}` に変更されました。これによりブランドカラーとの統一感が強化されています。

---

## Related Tokens

- `design-tokens/tier3-component/heading.json`: コンポーネントトークン定義
- `design-tokens/tier2-semantic/typography.json`: タイポグラフィトークン
- `docs/decisions/token-abstraction-strategy.md`: Typography Alias Pattern の決定背景
