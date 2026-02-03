---
title: Style
route: style
---

## Design Tokens

`pt-card`は以下のデザイントークンを使用します。

### Background & Border

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色（default） | `--pt-card-bg-default` | `{color.surface.card}` |
| 背景色（hover） | `--pt-card-bg-hover` | `{color.surface.hovered}` |
| 枠線色 | `--pt-card-border-default` | `{color.border.subtle}` |

### Text

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| タイトル色 | `--pt-card-text-title` | `{color.text.primary}` |
| 本文色 | `--pt-card-text-body` | `{color.text.secondary}` |

### Padding (Card 本体)

| Size | Token (Tier 3) | Reference | 用途 |
|------|----------------|-----------|------|
| `sm` | `--pt-card-padding-sm` | `{spacing.content.sm}` (8px) | コンパクトなカード |
| `md` | `--pt-card-padding-md` | `{spacing.content.md}` (16px) | 標準（デフォルト） |
| `lg` | `--pt-card-padding-lg` | `{spacing.content.lg}` (24px) | ゆったりしたカード |

### Elevation (Shadow)

| Elevation | Token (Tier 3) | Reference | 用途 |
|-----------|----------------|-----------|------|
| `flat` | `--pt-card-shadow-flat` | `{elevation.none}` | 境界線のみ |
| `raised` | `--pt-card-shadow-raised` | `{elevation.raised}` | やや浮いた印象（デフォルト） |
| `overlay` | `--pt-card-shadow-overlay` | `{elevation.overlay}` | モーダル/ドロップダウン用 |

### Border Radius

| Property | Token (Tier 3) | Reference |
|----------|----------------|-----------|
| 角丸 | `--pt-card-radius` | `{semantic-border.radius.lg}` (12px) |

---

## Section Tokens (Compound Components)

Phase 3d で追加された、`pt-card-header`、`pt-card-content`、`pt-card-footer` 用のトークンです。

| Visual Attribute | Token (Tier 3) | Reference | 用途 |
|-----------------|----------------|-----------|------|
| セクションパディング | `--pt-card-section-padding` | `{spacing.content.md}` (16px) | 各セクションの内部余白 |
| セクションギャップ | `--pt-card-section-gap` | `{spacing.gap.sm}` (8px) | footer内のボタン間隔など |
| セパレーター色 | `--pt-card-section-separator` | `{color.border.subtle}` | header/footerとcontentの区切り線 |

### Padding Suppression Pattern

Card 本体とセクションの両方にパディングがあると、二重パディング（32px）が発生します。これを防ぐため、セクション使用時は Card 本体のパディングが自動的に無効化されます：

```scss
:host:has(pt-card-header, pt-card-content, pt-card-footer) {
  padding: 0;
}
```

---

## Component Architecture

```
pt-card (Organism - Semantic Container)
├── pt-card-header   (Molecule - タイトル、メタ情報)
├── pt-card-content  (Molecule - メインコンテンツ)
└── pt-card-footer   (Molecule - アクションボタン)
```

| Section | Role |
|---------|------|
| `pt-card-header` | タイトル、メタ情報、アイコン |
| `pt-card-content` | メインコンテンツ |
| `pt-card-footer` | アクションボタン、補足情報 |

---

## Related Tokens

- `design-tokens/tier3-component/card.json`: コンポーネントトークン定義
- `docs/decisions/surface-card-responsibility.md`: Surface/Card 責務分離ドキュメント
