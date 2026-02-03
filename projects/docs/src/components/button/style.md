---
title: Style
route: style
---

## Design Tokens

`pt-button`は以下のデザイントークンを使用します。

### Primary Variant

メインCTA用。塗りつぶしスタイル。

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色（default） | `--pt-button-primary-bg-default` | `{color.gray.800}` |
| 背景色（hover） | `--pt-button-primary-bg-hover` | `{color.gray.700}` |
| 背景色（pressed） | `--pt-button-primary-bg-pressed` | `{color.gray.900}` |
| 背景色（disabled） | `--pt-button-primary-bg-disabled` | `{color.gray.200}` |
| テキスト色 | `--pt-button-primary-text-default` | `{color.text.inverse}` |
| テキスト色（disabled） | `--pt-button-primary-text-disabled` | `{color.text.disabled}` |
| フォーカスリング | `--pt-button-primary-border-focus` | `{color.border.focused}` |

### Secondary Variant

副次的アクション用。**枠線あり**スタイル。

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色（default） | `--pt-button-secondary-bg-default` | `transparent` |
| 背景色（hover） | `--pt-button-secondary-bg-hover` | `{color.surface.hovered}` |
| 背景色（pressed） | `--pt-button-secondary-bg-pressed` | `{color.surface.pressed}` |
| テキスト色 | `--pt-button-secondary-text-default` | `{color.text.primary}` |
| **枠線色（default）** | `--pt-button-secondary-border-default` | `{color.border.default}` |
| **枠線色（hover）** | `--pt-button-secondary-border-hover` | `{color.gray.600}` |
| フォーカスリング | `--pt-button-secondary-border-focus` | `{color.border.focused}` |

> **Note**: Phase 3c で Secondary に明示的な枠線が追加されました。これにより Ghost との視覚的差別化が強化されています。

### Ghost Variant

最小限の強調。**枠線なし**、背景透明。

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色（default） | `--pt-button-ghost-bg-default` | `transparent` |
| 背景色（hover） | `--pt-button-ghost-bg-hover` | `{color.surface.hovered}` |
| 背景色（pressed） | `--pt-button-ghost-bg-pressed` | `{color.surface.pressed}` |
| テキスト色 | `--pt-button-ghost-text-default` | `{color.text.primary}` |
| 枠線色 | `--pt-button-ghost-border-default` | `transparent` |

### Danger Variant

破壊的アクション用。赤色ベース。

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| 背景色（default） | `--pt-button-danger-bg-default` | `{color.result.lose.default}` |
| 背景色（hover） | `--pt-button-danger-bg-hover` | `{color.red.600}` |
| 背景色（pressed） | `--pt-button-danger-bg-pressed` | `{color.red.700}` |
| テキスト色 | `--pt-button-danger-text-default` | `{color.text.inverse}` |

---

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
