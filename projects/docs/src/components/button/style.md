---
title: Style
route: style
---

## Design Tokens

`pt-button`は以下のデザイントークンを使用します。

### Primary Variant

| Visual Attribute | Token (Tier 3) | Primitive Value |
|-----------------|----------------|-----------------|
| 背景色（default） | `--pt-button-primary-bg-default` | `{color.gray.800}` |
| 背景色（hover） | `--pt-button-primary-bg-hover` | `{color.gray.700}` |
| 背景色（pressed） | `--pt-button-primary-bg-pressed` | `{color.gray.900}` |
| 背景色（disabled） | `--pt-button-primary-bg-disabled` | `{color.gray.200}` |
| テキスト色 | `--pt-button-primary-text-default` | `{color.text.inverse}` |
| 枠線色（focus） | `--pt-button-primary-border-focus` | `{color.border.focused}` |

### Secondary Variant

| Visual Attribute | Token (Tier 3) | Primitive Value |
|-----------------|----------------|-----------------|
| 背景色（default） | `--pt-button-secondary-bg-default` | `transparent` |
| 背景色（hover） | `--pt-button-secondary-bg-hover` | `{color.surface.hovered}` |
| テキスト色 | `--pt-button-secondary-text-default` | `{color.text.primary}` |
| 枠線色 | `--pt-button-secondary-border-default` | `{color.border.default}` |

### Ghost Variant

| Visual Attribute | Token (Tier 3) | Primitive Value |
|-----------------|----------------|-----------------|
| 背景色（default） | `--pt-button-ghost-bg-default` | `transparent` |
| 背景色（hover） | `--pt-button-ghost-bg-hover` | `{color.surface.hovered}` |
| テキスト色 | `--pt-button-ghost-text-default` | `{color.text.primary}` |

### Danger Variant

| Visual Attribute | Token (Tier 3) | Primitive Value |
|-----------------|----------------|-----------------|
| 背景色（default） | `--pt-button-danger-bg-default` | `{color.result.lose.default}` |
| 背景色（hover） | `--pt-button-danger-bg-hover` | `{color.red.600}` |
| テキスト色 | `--pt-button-danger-text-default` | `{color.text.inverse}` |

---

## Related Tokens

- `design-tokens/tier3-component/button.json`: コンポーネントトークン定義
