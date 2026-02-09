---
title: Style
route: style
---

## Design Tokens

`pt-chip`は以下のデザイントークンを使用します。

<!-- @auto-generated:token-table:start -->
### Tokens

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `gap` | `--pt-chip-gap` | `{spacing.gap.xs}` |  | アイコンとテキスト間の隙間。`gap`に適用。 |

### Padding X

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `sm` | `--pt-chip-padding-x-sm` | `{space.10}` | 4px | Small時の内側余白 (4px)。 |
| `md` | `--pt-chip-padding-x-md` | `{space.15}` | 6px | Medium時の内側余白 (6px)。 |

### Font

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `weight` | `--pt-chip-font-weight` | `{font.weight.medium}` |  | チップのフォントウェイト。 |

### Font Size

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `sm` | `--pt-chip-font-size-sm` | `{font.size.xs}` | 12px | Small時のフォントサイズ (12px)。 |
| `md` | `--pt-chip-font-size-md` | `{font.size.sm}` | 14px | Medium時のフォントサイズ (14px)。 |

### Radius

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `none` | `--pt-chip-radius-none` |  | 0 | 角丸なし。 |
| `sm` | `--pt-chip-radius-sm` | `{semantic-border.radius.sm}` |  | 小さい角丸。 |
| `md` | `--pt-chip-radius-md` | `{semantic-border.radius.md}` |  | 標準の角丸。 |
| `full` | `--pt-chip-radius-full` |  | 9999px | 完全な丸み（ピル形状）。 |
<!-- @auto-generated:token-table:end -->

---

## Layout Specifications

サイズは**レイアウト密度**に基づいて選択します。iconOnlyモードでは縦横均等paddingで自然に正方形になります。

| Size | Padding | Gap | Font Size |
|------|---------|-----|-----------|
| `sm` | 4px | 4px | 12px |
| `md` | 6px | 4px | 14px |

---

## Interactive States

| State | Style |
|-------|-------|
| Default | `opacity: 1` |
| Hover (clickable) | `opacity: 0.8` |
| Active (clickable) | `opacity: 0.9` |

---

## Related Tokens

- `pt-type-chip`: Pokemon Type専用のChip
- `design-tokens/tier3-component/chip.json`: Chipトークン定義
