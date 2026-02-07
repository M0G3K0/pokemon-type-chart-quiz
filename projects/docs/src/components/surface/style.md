---
title: Style
route: style
---

## Design Tokens

`pt-surface`は以下のデザイントークンを使用します。

<!-- @auto-generated:token-table:start -->
### Variant Default

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `background` | `--pt-surface-variant-default-background` | `{color.surface.card}` |  | デフォルト背景。白色ベース。 |

### Variant Subtle

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `background` | `--pt-surface-variant-subtle-background` | `{color.surface.page}` |  | 控えめな背景。セクション区分けに使用。 |

### Variant Card

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `background` | `--pt-surface-variant-card-background` | `{color.surface.card}` |  | カード背景。elevationと併用。 |
| `elevation` | `--pt-surface-variant-card-elevation` | `{elevation.raised}` |  | カードの影。軽く浮いた状態。 |

### Variant Ghost

| Key | Token | Value | Description |
|------|------|------|------|
| `background` | `--pt-surface-variant-ghost-background` | transparent | 透明背景。親要素の背景を透過。 |

### Padding

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `none` | `--pt-surface-padding-none` |  | 0 | パディングなし。 |
| `sm` | `--pt-surface-padding-sm` | `{spacing.content.sm}` |  | 小パディング。コンパクトなコンテナ。 |
| `md` | `--pt-surface-padding-md` | `{spacing.content.md}` |  | 中パディング。標準的なコンテナ。デフォルト値。 |
| `lg` | `--pt-surface-padding-lg` | `{spacing.content.lg}` |  | 大パディング。ゆったりしたコンテナ。 |

### Radius

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `none` | `--pt-surface-radius-none` | `{semantic-border.radius.none}` |  | 角丸なし。 |
| `sm` | `--pt-surface-radius-sm` | `{semantic-border.radius.sm}` |  | 小角丸。 |
| `md` | `--pt-surface-radius-md` | `{semantic-border.radius.md}` |  | 中角丸。デフォルト値。 |
| `lg` | `--pt-surface-radius-lg` | `{semantic-border.radius.lg}` |  | 大角丸。 |
| `xl` | `--pt-surface-radius-xl` | `{semantic-border.radius.xl}` |  | 特大角丸。大きなコンテナやモーダル。 |
| `full` | `--pt-surface-radius-full` | `{semantic-border.radius.pill}` |  | 完全円形/ピル形状。 |

### Border

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `color` | `--pt-surface-border-color` | `{color.border.default}` |  | ボーダー色。 |
| `width` | `--pt-surface-border-width` | `{semantic-border.width.default}` |  | ボーダー幅。 |
<!-- @auto-generated:token-table:end -->

---

## Surface vs Card

| Attribute | pt-surface | pt-card |
|-----------|------------|---------|
| **用途** | 汎用コンテナ | セマンティックな情報ユニット |
| **構造** | 単一要素 | Header/Content/Footer |
| **デフォルト影** | なし（card variant で有効） | あり（raised） |
| **padding/radius** | 入力で制御 | サイズプリセット |

**ガイドライン**: 
- 単純な背景ボックスが必要なら `pt-surface`
- 意味のある情報グループなら `pt-card`

---

## Related Tokens

- `design-tokens/tier3-component/surface.json`: コンポーネントトークン定義
- `docs/decisions/surface-card-responsibility.md`: Surface/Card 責務分離ドキュメント
