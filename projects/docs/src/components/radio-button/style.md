---
title: Style
route: style
---

## Design Tokens

`pt-radio-button`は以下のデザイントークンを使用します。

### Default State

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色 | `--pt-radio-button-default-bg` | `{color.surface.card}` |
| 枠線色 | `--pt-radio-button-default-border` | `{color.border.default}` |
| テキスト色 | `--pt-radio-button-default-text` | `{color.text.primary}` |

### Hover State

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色 | `--pt-radio-button-hover-bg` | `{color.surface.hovered}` |
| 枠線色 | `--pt-radio-button-hover-border` | `{color.gray.400}` |

### Selected State

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色 | `--pt-radio-button-selected-bg` | `{color.gray.800}` |
| 枠線色 | `--pt-radio-button-selected-border` | `{color.gray.800}` |
| テキスト色 | `--pt-radio-button-selected-text` | `{color.text.inverse}` |
| シャドウ | `--pt-radio-button-shadow-selected` | `{elevation.overlay}` |

### Disabled State

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色 | `--pt-radio-button-disabled-bg` | `{color.surface.hovered}` |
| 枠線色 | `--pt-radio-button-disabled-border` | `{color.border.subtle}` |
| テキスト色 | `--pt-radio-button-disabled-text` | `{color.text.disabled}` |

### Feedback States

クイズ結果表示用のフィードバック状態です。

| State | 背景色 Token | 枠線色 Token | テキスト色 Token |
|-------|-------------|-------------|-----------------|
| `correct` | `--pt-radio-button-feedback-correct-bg` | `--pt-radio-button-feedback-correct-border` | `--pt-radio-button-feedback-correct-text` |
| `wrong` | `--pt-radio-button-feedback-wrong-bg` | `--pt-radio-button-feedback-wrong-border` | `--pt-radio-button-feedback-wrong-text` |
| `actual` | `--pt-radio-button-feedback-actual-bg` | `--pt-radio-button-feedback-actual-border` | `--pt-radio-button-feedback-actual-text` |

> **actual** 状態にはリング（`--pt-radio-button-feedback-actual-ring`）も適用されます。

---

## Layout

| Visual Attribute | Token (Tier 3) | Reference | Value |
|-----------------|----------------|-----------|-------|
| 角丸 | `--pt-radio-button-radius` | `{semantic-border.radius.md}` | 8px |
| パディングX | `--pt-radio-button-padding-x` | `{spacing.content.md}` | 16px |
| パディングY | `--pt-radio-button-padding-y` | `{spacing.content.sm}` | 8px |
| 枠線幅 | `--pt-radio-button-borderWidth` | `{semantic-border.width.thick}` | 2px |

### Phase 3 での変更点

- **角丸**: `radius-xl` (16px) → `radius-md` (8px) に変更。`pt-button` と統一。
- **パディングY**: `content.md` (16px) → `content.sm` (8px) に変更。よりコンパクトに。

---

## Shadow

| State | Token (Tier 3) | Reference |
|-------|----------------|-----------|
| Default | `--pt-radio-button-shadow-default` | `{elevation.raised}` |
| Selected | `--pt-radio-button-shadow-selected` | `{elevation.overlay}` |

---

## Text Color Inheritance

選択時やフィードバック時に子要素（`pt-text` など）がテキスト色を正しく継承するよう、以下のスタイルが適用されています：

```css
.selected ::ng-deep *,
.feedback-correct ::ng-deep *,
.feedback-wrong ::ng-deep *,
.feedback-actual ::ng-deep * {
  color: inherit !important;
}
```

---

## Related Tokens

- `design-tokens/tier3-component/radio-button.json`: コンポーネントトークン定義
