---
title: Style
route: style
---

## Design Tokens

`pt-chip`は以下のデザイントークンを使用します。

### Size Tokens

| Size | Padding | Font Size | Gap |
|------|---------|-----------|-----|
| `sm` | `var(--pt-space-1) var(--pt-space-2)` | `var(--pt-font-size-xs)` | `var(--pt-space-1)` |
| `md` | `var(--pt-space-2) var(--pt-space-3)` | `var(--pt-font-size-sm)` | `var(--pt-space-2)` |
| `lg` | `var(--pt-space-3) var(--pt-space-4)` | `var(--pt-font-size-base)` | `var(--pt-space-2)` |

### Text Color

| Visual Attribute | Token (Tier 2 Semantic) | Primitive Value |
|-----------------|-------------------------|-----------------|
| テキスト色（デフォルト） | `--pt-color-text-inverse` | `#FFFFFF` |

---

## Layout Specifications

| Size | Height | Padding (Y × X) | Gap | Font Size |
|------|--------|-----------------|-----|-----------|
| `sm` | 24px | 4px × 8px | 4px | 12px |
| `md` | 32px | 8px × 12px | 8px | 14px |
| `lg` | 40px | 12px × 16px | 8px | 16px |

---

## Border Radius

| Rounded | Value | Token |
|---------|-------|-------|
| `none` | 0 | - |
| `sm` | 4px | `var(--pt-border-radius-sm)` |
| `md` | 8px | `var(--pt-border-radius-md)` |
| `full` | 9999px | - |

---

## Interactive States

| State | Style |
|-------|-------|
| Default | `opacity: 1` |
| Hover (clickable) | `opacity: 0.8` |
| Active (clickable) | `opacity: 0.9` |
| Remove button default | `opacity: 0.7` |
| Remove button hover | `opacity: 1` |

---

## Related Tokens

- `pt-type-chip`: Pokemon Type専用のChip（タイプカラートークンを自動適用）
- `design-tokens/tier2-semantic/surfaces.json`: 背景色トークン
- `design-tokens/tier2-semantic/typography.json`: フォントサイズトークン
