---
title: Style
route: style
---

## Design Tokens

`pt-chip`は以下のデザイントークンを使用します。

### Size Tokens

| Size | Padding Token | Font Size Token |
|------|---------------|-----------------|
| `sm` | `--pt-chip-padding-x-sm` (4px) | `--pt-chip-font-size-sm` (12px) |
| `md` | `--pt-chip-padding-x-md` (6px) | `--pt-chip-font-size-md` (14px) |

### Other Tokens

| Property | Token | Value |
|----------|-------|-------|
| Gap | `--pt-chip-gap` | 4px |
| Font Weight | `--pt-chip-font-weight` | 500 |
| Transition | `--pt-chip-interaction-transition` | 150ms |

### Text Color

| Visual Attribute | Token | Primitive Value |
|-----------------|-------|-----------------|
| テキスト色（デフォルト） | `--pt-color-text-inverse` | `#FFFFFF` |

---

## Layout Specifications

サイズは**レイアウト密度**に基づいて選択します。iconOnlyモードでは縦横均等paddingで自然に正方形になります。

| Size | Padding | Gap | Font Size |
|------|---------|-----|-----------|
| `sm` | 4px | 4px | 12px |
| `md` | 6px | 4px | 14px |

---

## Border Radius

| Rounded | Token | Value |
|---------|-------|-------|
| `none` | `--pt-chip-radius-none` | 0 |
| `sm` | `--pt-chip-radius-sm` | 4px |
| `md` | `--pt-chip-radius-md` | 8px |
| `full` | `--pt-chip-radius-full` | 9999px |

---

## Interactive States

| State | Style |
|-------|-------|
| Default | `opacity: 1` |
| Hover (clickable) | `opacity: 0.8` |
| Active (clickable) | `opacity: 0.9` |

---

## CSS Variables (Generated)

```css
/* Padding - 縦横均等で適用 */
--pt-chip-padding-x-sm: var(--pt-space-1);   /* 4px */
--pt-chip-padding-x-md: var(--pt-space-15);  /* 6px */

/* Font Size */
--pt-chip-font-size-sm: var(--pt-font-size-xs);  /* 12px */
--pt-chip-font-size-md: var(--pt-font-size-sm);  /* 14px */

/* Gap */
--pt-chip-gap: var(--pt-spacing-gap-xs);  /* 4px */

/* Border Radius */
--pt-chip-radius-none: 0;
--pt-chip-radius-sm: var(--pt-semantic-border-radius-sm);  /* 4px */
--pt-chip-radius-md: var(--pt-semantic-border-radius-md);  /* 8px */
--pt-chip-radius-full: 9999px;
```

---

## Related Tokens

- `pt-type-chip`: Pokemon Type専用のChip
- `design-tokens/tier3-component/chip.json`: Chipトークン定義
