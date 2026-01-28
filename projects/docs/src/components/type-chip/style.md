---
title: Style
route: style
---

## Design Tokens

`pt-type-chip`は以下のデザイントークンを使用します。

### Background Color

| Visual Attribute | Token (Tier 2 Semantic) | Primitive Value |
|-----------------|-------------------------|-----------------|
| normal背景 | `--pt-color-pokemon-normal-500` | `#A8A77A` |
| fire背景 | `--pt-color-pokemon-fire-500` | `#EE8130` |
| water背景 | `--pt-color-pokemon-water-500` | `#6390F0` |
| electric背景 | `--pt-color-pokemon-electric-500` | `#F7D02C` |
| grass背景 | `--pt-color-pokemon-grass-500` | `#7AC74C` |
| ice背景 | `--pt-color-pokemon-ice-500` | `#96D9D6` |
| fighting背景 | `--pt-color-pokemon-fighting-500` | `#C22E28` |
| poison背景 | `--pt-color-pokemon-poison-500` | `#A33EA1` |
| ground背景 | `--pt-color-pokemon-ground-500` | `#E2BF65` |
| flying背景 | `--pt-color-pokemon-flying-500` | `#A98FF3` |
| psychic背景 | `--pt-color-pokemon-psychic-500` | `#F95587` |
| bug背景 | `--pt-color-pokemon-bug-500` | `#A6B91A` |
| rock背景 | `--pt-color-pokemon-rock-500` | `#B6A136` |
| ghost背景 | `--pt-color-pokemon-ghost-500` | `#735797` |
| dragon背景 | `--pt-color-pokemon-dragon-500` | `#6F35FC` |
| dark背景 | `--pt-color-pokemon-dark-500` | `#705746` |
| steel背景 | `--pt-color-pokemon-steel-500` | `#B7B7CE` |
| fairy背景 | `--pt-color-pokemon-fairy-500` | `#D685AD` |

### Text Color

| Visual Attribute | Token (Tier 2 Semantic) | Primitive Value |
|-----------------|-------------------------|-----------------|
| テキスト色 | `--pt-color-text-inverse` | `#FFFFFF` |

---

## Layout Specifications

`pt-chip`から継承されるサイズ仕様：

| Size | Height | Padding (horizontal) | Gap | Font Size |
|------|--------|---------------------|-----|-----------|
| `sm` | 24px | 8px | 4px | 12px |
| `md` | 32px | 12px | 6px | 14px |
| `lg` | 40px | 16px | 8px | 16px |

> ⚠️ **Note**: 現在これらの値はハードコードされています。`chip.json`コンポーネントトークン作成後、トークン参照に置き換わる予定です（Issue #94）。

---

## Border Radius

| Rounded | Value |
|---------|-------|
| `none` | 0 |
| `sm` | 4px |
| `md` | 8px |
| `full` | 9999px |

---

## Related Tokens

- `pt-chip`: 汎用Chipのスタイル仕様を参照
- `design-tokens/tier2-semantic/pokemon.json`: ポケモンタイプカラー定義
