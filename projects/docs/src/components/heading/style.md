---
title: Style
route: style
---

## Design Tokens

`pt-heading`は以下のデザイントークンを使用します。

<!-- @auto-generated:token-table:start -->
### Text

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `color` | `--pt-heading-text-color` | `{color.text.primary}` |  | 見出しテキストの色 |

### Font

| Variant | FontFamily | FontSize | FontWeight | LineHeight |
|------|------|------|------|------|
| `xl` | `--pt-heading-font-xl-font-family` | `--pt-heading-font-xl-font-size` | `--pt-heading-font-xl-font-weight` | `--pt-heading-font-xl-line-height` |
| `lg` | `--pt-heading-font-lg-font-family` | `--pt-heading-font-lg-font-size` | `--pt-heading-font-lg-font-weight` | `--pt-heading-font-lg-line-height` |
| `md` | `--pt-heading-font-md-font-family` | `--pt-heading-font-md-font-size` | `--pt-heading-font-md-font-weight` | `--pt-heading-font-md-line-height` |
| `sm` | `--pt-heading-font-sm-font-family` | `--pt-heading-font-sm-font-size` | `--pt-heading-font-sm-font-weight` | `--pt-heading-font-sm-line-height` |

### Accent

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `width` | `--pt-heading-accent-width` |  | 6px | アクセントバーの幅。視覚的なアクセントとしては十分かつ控えめなサイズ。 |
| `height` | `--pt-heading-accent-height` | `{space.60}` |  | アクセントバーの高さ。テキストの行高さに合わせた値。 |
| `radius` | `--pt-heading-accent-radius` | `{radius.full}` |  | アクセントバーの角丸。pill形状にする。 |
| `gap` | `--pt-heading-accent-gap` | `{space.20}` |  | アクセントバーとテキスト間のギャップ。 |
| `color` | `--pt-heading-accent-color` | `{color.text.primary}` |  | アクセントバーの色。primaryテキストと同じ色でブランド統一感を出す。 |
<!-- @auto-generated:token-table:end -->

---

## Typography (Font Aliases)

Phase 3e で導入された **Typography Alias Pattern** により、`pt-heading` は Tier 3 の `font.*` エイリアストークンを通じて Tier 2 タイポグラフィを参照します。

これにより **100% Tier 3 Isolation** を達成し、コンポーネントが直接 Tier 2 トークンを参照することを防いでいます。

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

> **Note**: Phase 3e で `accent.color` が `{color.primary}` から `{color.text.primary}` に変更されました。これによりブランドカラーとの統一感が強化されています。

---

## Related Tokens

- `design-tokens/tier3-component/heading.json`: コンポーネントトークン定義
- `design-tokens/tier2-semantic/typography.json`: タイポグラフィトークン
- `docs/decisions/token-abstraction-strategy.md`: Typography Alias Pattern の決定背景
