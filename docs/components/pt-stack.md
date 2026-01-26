# pt-stack

> Flexboxベースの積み上げレイアウトプリミティブ

**ベンチマーク**: [Chakra UI Stack](https://chakra-ui.com/docs/components/stack) | [MUI Stack](https://mui.com/material-ui/react-stack/)

---

## Overview

`pt-stack` は要素を縦または横に積み上げ、一貫したギャップを適用するレイアウトコンポーネントです。Flexboxを使用し、配置・整列を宣言的に制御できます。

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **縦に並べたい要素群** | フォームフィールド、カード内のテキスト群 |
| **横に並べたい要素群** | ボタン群、アイコン+テキスト |
| **レスポンシブレイアウト** | モバイルは縦、デスクトップは横 |
| **一貫したギャップが必要** | Design Tokensに基づくスペーシング |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **グリッドレイアウト** | n列の規則正しい配置はGridの責務 | `pt-grid` |
| **単一要素** | Stackの意味がない | 直接スタイル |
| **複雑なネスト** | 可読性が下がる | 適切なセクション分割 |

---

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'vertical' \| 'horizontal' \| 'responsive'` | `'vertical'` | 積み上げ方向 |
| `gap` | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 要素間ギャップ |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | 交差軸の配置 |
| `justify` | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | 主軸の配置 |

### Design Tokens

| Token | Reference | Value | 用途 |
|-------|-----------|-------|------|
| `stack.gap.none` | - | `0` | 密着配置 |
| `stack.gap.xs` | `{spacing.gap.xs}` | 4px | 密接な要素間 |
| `stack.gap.sm` | `{spacing.gap.sm}` | 8px | 関連要素間 |
| `stack.gap.md` | `{spacing.gap.md}` | 16px | 標準（default） |
| `stack.gap.lg` | `{spacing.gap.lg}` | 24px | セクション内区切り |
| `stack.gap.xl` | `{spacing.content.xl}` | 32px | 明確な分割 |

---

## Accessibility

- スタック自体にはARIA属性不要
- 内包要素の順序がDOMの順序と一致することを確認

---

## Examples

### Basic Vertical Stack

```html
<pt-stack direction="vertical" gap="md">
  <h2>タイトル</h2>
  <p>説明文</p>
</pt-stack>
```

### Horizontal Stack (Button Group)

```html
<pt-stack direction="horizontal" gap="sm" align="center">
  <pt-button>キャンセル</pt-button>
  <pt-button variant="primary">保存</pt-button>
</pt-stack>
```

### Responsive Stack

```html
<pt-stack direction="responsive" gap="lg" align="center">
  <pt-avatar src="..." alt="ピカチュウ"></pt-avatar>
  <div>
    <h2>ピカチュウ</h2>
    <pt-type-chip type="electric">でんき</pt-type-chip>
  </div>
</pt-stack>
```

---

## Design Patterns

### Centered Content

```html
<pt-stack direction="vertical" gap="md" align="center" justify="center">
  <!-- 中央揃えコンテンツ -->
</pt-stack>
```

### Space Between

```html
<pt-stack direction="horizontal" justify="between" align="center">
  <span>左寄せ</span>
  <span>右寄せ</span>
</pt-stack>
```

---

## Related Components

- `pt-grid`: 規則的なグリッドレイアウト
- `pt-surface`: 背景・枠線などのコンテナスタイリング

---

## References

- [Chakra UI Stack](https://chakra-ui.com/docs/components/stack)
- [MUI Stack](https://mui.com/material-ui/react-stack/)
- [Every Layout: Stack](https://every-layout.dev/layouts/stack/)
