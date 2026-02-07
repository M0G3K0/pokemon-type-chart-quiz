---
title: Style
route: style
---

## Design Tokens

`pt-button`は以下のデザイントークンを使用します。


<!-- @auto-generated:token-table:start -->
### Tokens

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `gap` | `--pt-button-gap` | `{spacing.content.xs}` | 4px | ボタン内のアイコンとラベル間のギャップ (4px)。`gap`に適用。 |
| `radius` | `--pt-button-radius` | `{semantic-border.radius.md}` | 8px | ボタンの角丸 (8px)。`border-radius`に適用。 |

### Primary Bg

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-primary-bg-default` | `{color.gray.800}` |  | ボタンの背景色。`background-color`に適用。 |
| `hover` | `--pt-button-primary-bg-hover` | `{color.gray.700}` |  | ホバー時の背景色。defaultより一段明るくして反応を示す。 |
| `pressed` | `--pt-button-primary-bg-pressed` | `{color.gray.900}` |  | 押下時の背景色。defaultより一段暗くして押し込み感を表現。 |
| `disabled` | `--pt-button-primary-bg-disabled` | `{color.gray.200}` |  | 無効時の背景色。操作不可を視覚的に示す。 |

### Primary Text

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-primary-text-default` | `{color.text.inverse}` |  | ボタンのラベル色。`color`に適用。暗い背景上で白文字。 |
| `disabled` | `--pt-button-primary-text-disabled` | `{color.text.disabled}` |  | 無効時のラベル色。コントラストを下げて操作不可を示す。 |

### Primary Border

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-primary-border-default` |  | transparent | ボタンの枠線色。Primaryは枠なし。 |
| `focus` | `--pt-button-primary-border-focus` | `{color.border.focused}` |  | フォーカスリングの色。`outline`に適用。アクセシビリティ用。 |

### Secondary Bg

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-secondary-bg-default` |  | transparent | 背景色。Secondaryは透明で枠線を強調。 |
| `hover` | `--pt-button-secondary-bg-hover` | `{color.surface.hovered}` |  | ホバー時の背景色。薄いグレーで反応を示す。 |
| `pressed` | `--pt-button-secondary-bg-pressed` | `{color.surface.pressed}` |  | 押下時の背景色。hoverより一段暗い。 |
| `disabled` | `--pt-button-secondary-bg-disabled` |  | transparent | 無効時の背景色。透明のまま。 |

### Secondary Text

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-secondary-text-default` | `{color.text.primary}` |  | ラベル色。通常テキスト色を使用。 |
| `disabled` | `--pt-button-secondary-text-disabled` | `{color.text.disabled}` |  | 無効時のラベル色。 |

### Secondary Border

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-secondary-border-default` | `{color.border.default}` |  | 枠線色。`border-color`に適用。 |
| `hover` | `--pt-button-secondary-border-hover` | `{color.gray.600}` |  | ホバー時の枠線色。一段濃くして強調。 |
| `focus` | `--pt-button-secondary-border-focus` | `{color.border.focused}` |  | フォーカスリングの色。 |

### Ghost Bg

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-ghost-bg-default` |  | transparent | 背景色。完全透明。 |
| `hover` | `--pt-button-ghost-bg-hover` | `{color.surface.hovered}` |  | ホバー時の背景色。薄いグレーで存在を示す。 |
| `pressed` | `--pt-button-ghost-bg-pressed` | `{color.surface.pressed}` |  | 押下時の背景色。 |
| `disabled` | `--pt-button-ghost-bg-disabled` |  | transparent | 無効時の背景色。透明のまま。 |

### Ghost Text

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-ghost-text-default` | `{color.text.primary}` |  | ラベル色。通常テキスト色。 |
| `disabled` | `--pt-button-ghost-text-disabled` | `{color.text.disabled}` |  | 無効時のラベル色。 |

### Ghost Border

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-ghost-border-default` |  | transparent | 枠線色。Ghostは枠なし。 |
| `focus` | `--pt-button-ghost-border-focus` | `{color.border.focused}` |  | フォーカスリングの色。 |

### Danger Bg

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-danger-bg-default` | `{color.result.lose.default}` |  | 背景色。危険・破壊的アクション用の赤。 |
| `hover` | `--pt-button-danger-bg-hover` | `{color.red.600}` |  | ホバー時の背景色。defaultより一段暗く。 |
| `pressed` | `--pt-button-danger-bg-pressed` | `{color.red.700}` |  | 押下時の背景色。hoverより一段暗く。 |
| `disabled` | `--pt-button-danger-bg-disabled` | `{color.gray.200}` |  | 無効時の背景色。操作不可を視覚的に示す。 |

### Danger Text

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-danger-text-default` | `{color.text.inverse}` |  | ラベル色。赤背景上で白文字。 |
| `disabled` | `--pt-button-danger-text-disabled` | `{color.text.disabled}` |  | 無効時のラベル色。 |

### Danger Border

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-button-danger-border-default` |  | transparent | 枠線色。Dangerは枠なし。 |
| `focus` | `--pt-button-danger-border-focus` | `{color.border.focused}` |  | フォーカスリングの色。 |

### Padding

| Variant | Sm | Md | Lg |
|------|------|------|------|
| `x` | `--pt-button-padding-x-sm` | `--pt-button-padding-x-md` | `--pt-button-padding-x-lg` |
| `y` | `--pt-button-padding-y-sm` | `--pt-button-padding-y-md` | `--pt-button-padding-y-lg` |

### Font Size

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `sm` | `--pt-button-font-size-sm` | `{font.size.sm}` | 14px | SMフォントサイズ (14px)。`font-size`に適用。 |
| `md` | `--pt-button-font-size-md` | `{font.size.md}` | 16px | MDフォントサイズ (16px)。`font-size`に適用。 |
| `lg` | `--pt-button-font-size-lg` | `{font.size.lg}` | 18px | LGフォントサイズ (18px)。`font-size`に適用。 |

### Interaction

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `duration` | `--pt-button-interaction-duration` | `{motion.duration.quick}` |  | トランジションの長さ (150ms)。`transition-duration`に適用。 |
| `easing` | `--pt-button-interaction-easing` | `{motion.easing.default}` |  | トランジションのイージング。`transition-timing-function`に適用。 |
<!-- @auto-generated:token-table:end -->
## Variant 比較

| Variant | Background | Border | Use Case |
|---------|------------|--------|----------|
| `primary` | 塗りつぶし | なし | メインCTA |
| `secondary` | 透明 | **あり** | 副次的アクション |
| `ghost` | 透明 | なし | 控えめなアクション |
| `danger` | 赤塗りつぶし | なし | 削除・破壊的操作 |

---

## Related Tokens

- `design-tokens/tier3-component/button.json`: コンポーネントトークン定義
