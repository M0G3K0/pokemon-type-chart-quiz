---
title: Style
route: style
---

## Design Tokens

`pt-surface`は以下のデザイントークンを使用します。

### Variant (Background)

| Variant | Token (Tier 3) | Reference | 用途 |
|---------|----------------|-----------|------|
| `default` | `--pt-surface-variant-default-background` | `{color.surface.card}` | 標準背景（白） |
| `subtle` | `--pt-surface-variant-subtle-background` | `{color.surface.page}` | セクション区分け |
| `card` | `--pt-surface-variant-card-background` | `{color.surface.card}` | 浮いたカード風 |
| `ghost` | `--pt-surface-variant-ghost-background` | `transparent` | 親の背景を透過 |

### Variant Card Elevation

| Property | Token (Tier 3) | Reference |
|----------|----------------|-----------|
| Shadow | `--pt-surface-variant-card-elevation` | `{elevation.raised}` |

---

## Padding

| Size | Token (Tier 3) | Reference | Value |
|------|----------------|-----------|-------|
| `none` | `--pt-surface-padding-none` | `0` | 0 |
| `sm` | `--pt-surface-padding-sm` | `{spacing.content.sm}` | 8px |
| `md` | `--pt-surface-padding-md` | `{spacing.content.md}` | 16px |
| `lg` | `--pt-surface-padding-lg` | `{spacing.content.lg}` | 24px |

---

## Border Radius

| Size | Token (Tier 3) | Reference | Value |
|------|----------------|-----------|-------|
| `none` | `--pt-surface-radius-none` | `{semantic-border.radius.none}` | 0 |
| `sm` | `--pt-surface-radius-sm` | `{semantic-border.radius.sm}` | 4px |
| `md` | `--pt-surface-radius-md` | `{semantic-border.radius.md}` | 8px |
| `lg` | `--pt-surface-radius-lg` | `{semantic-border.radius.lg}` | 12px |
| `xl` | `--pt-surface-radius-xl` | `{semantic-border.radius.xl}` | 16px |
| `full` | `--pt-surface-radius-full` | `{semantic-border.radius.pill}` | 9999px |

---

## Border

| Property | Token (Tier 3) | Reference |
|----------|----------------|-----------|
| 枠線色 | `--pt-surface-border-color` | `{color.border.default}` |
| 枠線幅 | `--pt-surface-border-width` | `{semantic-border.width.default}` |

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
