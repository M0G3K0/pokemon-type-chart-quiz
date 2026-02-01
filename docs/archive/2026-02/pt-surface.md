# pt-surface

> コンテナの見た目（背景、枠線、角丸、パディング）を提供するスタイリングプリミティブ

**ベンチマーク**: [MUI Paper](https://mui.com/material-ui/react-paper/) | [Radix UI Box](https://www.radix-ui.com/primitives)

---

## Overview

`pt-surface` は背景色、枠線、角丸、パディングを一括で制御するコンテナコンポーネントです。レイアウト構造（Stack/Grid）とは独立した視覚的な「面」を表現します。

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **背景色で区切りたい** | セクションの視覚的分離 |
| **カード風の見た目** | 影付きの浮いたコンテナ |
| **一貫したパディング** | Design Tokensに基づく余白 |
| **構造とスタイルの分離** | pt-stackと組み合わせて使用 |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **単なるdivラッパー** | ghost+padding-noneなら意味がない | 直接スタイル |
| **pt-card の置き換え** | カードはヘッダー/フッター構造を持つ | `pt-card` |
| **レイアウト制御** | 配置はSurfaceの責務外 | `pt-stack`, `pt-grid` |

---

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'subtle' \| 'card' \| 'ghost'` | `'default'` | 背景スタイル |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 内側余白 |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | 角丸 |
| `border` | `boolean` | `false` | 枠線の有無 |

### Variant Details

| Variant | Background | Shadow | 用途 |
|---------|------------|--------|------|
| `default` | 白 | なし | 標準背景 |
| `subtle` | 薄いグレー | なし | セクション区分け |
| `card` | 白 | あり | 浮いたカード風 |
| `ghost` | 透明 | なし | 親の背景を透過 |

### Design Tokens

| Token | Reference | 用途 |
|-------|-----------|------|
| `surface.variant.default.background` | `{color.surface}` | 白背景 |
| `surface.variant.subtle.background` | `{color.surface-subtle}` | 薄いグレー背景 |
| `surface.variant.card.elevation` | `{elevation.raised}` | カードの影 |
| `surface.padding.*` | `{spacing.content.*}` | パディング |
| `surface.radius.*` | `{semantic-border.radius.*}` | 角丸 |
| `surface.border.width` | `{semantic-border.width.default}` | 枠線幅 |

---

## Accessibility

- Surfaceは視覚的なコンテナであり、ARIA属性不要
- 背景色とテキスト色のコントラスト比に注意

---

## Examples

### Basic Surface

```html
<pt-surface variant="subtle" padding="lg" radius="xl">
  <p>控えめな背景のコンテナ</p>
</pt-surface>
```

### Card-like Surface

```html
<pt-surface variant="card" padding="md" radius="lg" [border]="true">
  <h3>カード風</h3>
  <p>影と枠線付き</p>
</pt-surface>
```

### Combined with Stack

```html
<pt-surface variant="subtle" padding="lg" radius="xl">
  <pt-stack direction="horizontal" gap="lg" align="center">
    <pt-avatar src="..." alt="..."></pt-avatar>
    <div>
      <h2>ポケモン名</h2>
      <pt-type-chip type="fire">ほのお</pt-type-chip>
    </div>
  </pt-stack>
</pt-surface>
```

---

## Design Patterns

### Section Background

```html
<pt-surface variant="subtle" padding="lg" radius="xl" [border]="true">
  <!-- セクションコンテンツ -->
</pt-surface>
```

### Ghost Surface (inheritance)

```html
<div style="background: linear-gradient(...)">
  <pt-surface variant="ghost" padding="md">
    <!-- 親の背景を透過 -->
  </pt-surface>
</div>
```

---

## Related Components

- `pt-stack`: レイアウト構造（併用推奨）
- `pt-card`: ヘッダー/コンテンツ/フッター構造を持つカード
- `pt-grid`: グリッドレイアウト

---

## References

- [MUI Paper](https://mui.com/material-ui/react-paper/)
- [Radix UI Box](https://www.radix-ui.com/primitives)
- [Every Layout: Box](https://every-layout.dev/layouts/box/)
