---
title: Style
route: style
---

## Design Tokens

`pt-radio-button`は以下のデザイントークンを使用します。

<!-- @auto-generated:token-table:start -->
### Tokens

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `radius` | `--pt-radio-button-radius` | `{semantic-border.radius.md}` |  | 角丸。`border-radius`に適用。Buttonと統一。 |
| `borderWidth` | `--pt-radio-button-border-width` | `{semantic-border.width.thick}` |  | 枠線の太さ。`border-width`に適用。 |

### Default

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `bg` | `--pt-radio-button-default-bg` | `{color.surface.card}` |  | 未選択時の背景色。`background-color`に適用。 |
| `border` | `--pt-radio-button-default-border` | `{color.border.default}` |  | 未選択時の枠線色。`border-color`に適用。 |
| `text` | `--pt-radio-button-default-text` | `{color.text.primary}` |  | 未選択時のラベル色。`color`に適用。 |

### Hover

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `bg` | `--pt-radio-button-hover-bg` | `{color.surface.hovered}` |  | ホバー時の背景色。インタラクション可能を示す。 |
| `border` | `--pt-radio-button-hover-border` | `{color.gray.400}` |  | ホバー時の枠線色。defaultより一段濃くして反応を示す。 |

### Selected

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `bg` | `--pt-radio-button-selected-bg` | `{color.gray.800}` |  | 選択時の背景色。暗い色で選択状態を強調。 |
| `border` | `--pt-radio-button-selected-border` | `{color.gray.800}` |  | 選択時の枠線色。背景と同色。 |
| `text` | `--pt-radio-button-selected-text` | `{color.text.inverse}` |  | 選択時のラベル色。暗い背景上で白文字。 |

### Disabled

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `bg` | `--pt-radio-button-disabled-bg` | `{color.surface.hovered}` |  | 無効時の背景色。操作不可を視覚的に示す。 |
| `border` | `--pt-radio-button-disabled-border` | `{color.border.subtle}` |  | 無効時の枠線色。控えめな境界線。 |
| `text` | `--pt-radio-button-disabled-text` | `{color.text.disabled}` |  | 無効時のラベル色。コントラストを下げて操作不可を示す。 |

### Feedback Correct

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `bg` | `--pt-radio-button-feedback-correct-bg` | `{color.result.win.default}` |  | 正解時の背景色。正解・勝利を示す緑。 |
| `border` | `--pt-radio-button-feedback-correct-border` | `{color.result.win.default}` |  | 正解時の枠線色。背景と同色。 |
| `text` | `--pt-radio-button-feedback-correct-text` | `{color.text.inverse}` |  | 正解時のラベル色。緑背景上で白文字。 |

### Feedback Wrong

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `bg` | `--pt-radio-button-feedback-wrong-bg` | `{color.result.lose.default}` |  | 不正解時の背景色。不正解・敗北を示す赤。 |
| `border` | `--pt-radio-button-feedback-wrong-border` | `{color.result.lose.default}` |  | 不正解時の枠線色。背景と同色。 |
| `text` | `--pt-radio-button-feedback-wrong-text` | `{color.text.inverse}` |  | 不正解時のラベル色。赤背景上で白文字。 |

### Feedback Actual

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `bg` | `--pt-radio-button-feedback-actual-bg` | `{color.surface.card}` |  | 正解表示時の背景色。Card背景のまま。 |
| `border` | `--pt-radio-button-feedback-actual-border` | `{color.result.win.default}` |  | 正解表示時の枠線色。緑の枠で正解を示す。 |
| `text` | `--pt-radio-button-feedback-actual-text` | `{color.result.win.default}` |  | 正解表示時のラベル色。緑テキストで強調。 |
| `ring` | `--pt-radio-button-feedback-actual-ring` | `{color.result.win.subtle}` |  | 正解表示時のリング色。box-shadowで外側に薄緑リング。 |

### Focus

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `ring` | `--pt-radio-button-focus-ring` | `{color.border.focused}` |  | フォーカスリングの色。`outline`に適用。アクセシビリティ用。 |

### Padding

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `x` | `--pt-radio-button-padding-x` | `{spacing.content.md}` |  | 水平方向の内側余白。`padding-inline`に適用。 |
| `y` | `--pt-radio-button-padding-y` | `{spacing.content.sm}` |  | 垂直方向の内側余白。`padding-block`に適用。よりコンパクトに。 |

### Shadow

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-radio-button-shadow-default` | `{elevation.raised}` |  | デフォルト時の影。軽く浮いた印象。 |
| `selected` | `--pt-radio-button-shadow-selected` | `{elevation.overlay}` |  | 選択時の影。より強調された浮き上がり。 |
<!-- @auto-generated:token-table:end -->

---

## Layout

### Phase 3 での変更点

- **角丸**: `radius-xl` (16px) → `radius-md` (8px) に変更。`pt-button` と統一。
- **パディングY**: `content.md` (16px) → `content.sm` (8px) に変更。よりコンパクトに。

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
