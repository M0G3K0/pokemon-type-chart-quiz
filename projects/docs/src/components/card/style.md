---
title: Style
route: style
---

## Design Tokens

`pt-card`は以下のデザイントークンを使用します。


<!-- @auto-generated:token-table:start -->
### Tokens

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `radius` | `--pt-card-radius` | `{semantic-border.radius.lg}` |  | border-radiusプロパティに適用。カードコンポーネント専用。overflow: hiddenとセットで使用。 |

### Bg

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-card-bg-default` | `{color.surface.card}` |  | background-colorプロパティに適用。カードコンポーネント専用。デフォルト状態。 |
| `hover` | `--pt-card-bg-hover` | `{color.surface.hovered}` |  | background-colorプロパティに適用。カードコンポーネント専用。ホバー状態。クリック可能なカード用。 |

### Border

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-card-border-default` | `{color.border.subtle}` |  | border-colorプロパティに適用。カードコンポーネント専用。控えめな境界線。 |

### Text

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `title` | `--pt-card-text-title` | `{color.text.primary}` |  | colorプロパティに適用。カードコンポーネント専用。見出しテキスト。 |
| `body` | `--pt-card-text-body` | `{color.text.secondary}` |  | colorプロパティに適用。カードコンポーネント専用。本文テキスト。見出しより控えめ。 |

### Shadow

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `flat` | `--pt-card-shadow-flat` | `{elevation.none}` |  | box-shadowプロパティに適用。カードコンポーネント専用。影なし、フラットスタイル。 |
| `raised` | `--pt-card-shadow-raised` | `{elevation.raised}` |  | box-shadowプロパティに適用。カードコンポーネント専用。デフォルトの浮き上がり。 |
| `overlay` | `--pt-card-shadow-overlay` | `{elevation.overlay}` |  | box-shadowプロパティに適用。カードコンポーネント専用。モーダル/ドロップダウン用の強い影。 |

### Padding

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `sm` | `--pt-card-padding-sm` | `{spacing.content.sm}` |  | paddingプロパティに適用。カードコンポーネント専用。コンパクトな内部余白。 |
| `md` | `--pt-card-padding-md` | `{spacing.content.md}` |  | paddingプロパティに適用。カードコンポーネント専用。デフォルトの内部余白。 |
| `lg` | `--pt-card-padding-lg` | `{spacing.content.lg}` |  | paddingプロパティに適用。カードコンポーネント専用。広々とした内部余白。 |

### Section

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `padding` | `--pt-card-section-padding` | `{spacing.content.md}` |  | paddingプロパティに適用。header/content/footer各セクションの内部余白。 |
| `gap` | `--pt-card-section-gap` | `{spacing.gap.sm}` |  | gapプロパティに適用。footer内のボタン間隔など。 |
| `separator` | `--pt-card-section-separator` | `{color.border.subtle}` |  | border-colorプロパティに適用。header/footerとcontentの間の区切り線。 |
<!-- @auto-generated:token-table:end -->
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
