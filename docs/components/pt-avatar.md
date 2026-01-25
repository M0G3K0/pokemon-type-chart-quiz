# pt-avatar

> **Molecule**: 画像を表示するためのアバターコンポーネント

ユーザープロフィール画像、サムネイル、アイコン的な画像表示に使用します。

---

## Overview

`pt-avatar` は、画像を一貫したサイズ・形状で表示するための Molecule コンポーネントです。ピクセルアート表示にも対応し、レトロゲームのスプライトなどの表示に最適化されています。

---

## When to use ✅

- ユーザーやアイテムを表す画像を表示する場合
- サムネイル画像を統一されたサイズで表示する場合
- ピクセルアート（ドット絵）を鮮明に表示する場合

---

## When not to use ❌

- 装飾的な背景画像 → 通常の `<img>` や CSS background を使用
- アイコン（SVG）の表示 → `pt-icon` を使用
- 複雑なメディア表示 → 専用のメディアコンポーネントを検討

---

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | 画像のURL |
| `alt` | `string` | **required** | 代替テキスト（アクセシビリティ必須） |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | サイズバリアント |
| `shape` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | 形状 |
| `pixelated` | `boolean` | `false` | ピクセルアート用のレンダリング |
| `bgColor` | `string` | - | 背景色（CSSカスタムプロパティ推奨） |
| `shadow` | `boolean` | `false` | 影の有無 |

### Size Variants

| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 32×32px | リスト内のアイコン |
| `md` | 48×48px | 標準サイズ |
| `lg` | 80×80px | カード内メイン画像 |
| `xl` | 120×120px | プロフィール画面 |

### Shape Variants

| Shape | border-radius | Use Case |
|-------|--------------|----------|
| `circle` | 50% | ユーザーアバター |
| `rounded` | `--pt-radius-lg` | サムネイル |
| `square` | `--pt-radius-sm` | ピクセルアート |

### Design Tokens

```scss
// 形状
--pt-radius-full
--pt-radius-lg
--pt-radius-sm

// 影
--pt-shadow-inner
```

---

## Accessibility

- `alt` 属性は必須です
- 装飾的な画像には `alt=""` を使用
- `loading="lazy"` によるパフォーマンス最適化

---

## Examples

### 基本的な使用

```html
<pt-avatar 
  src="/images/profile.png" 
  alt="ユーザー名"
  size="md"
  shape="circle">
</pt-avatar>
```

### ピクセルアート表示

```html
<pt-avatar 
  src="/sprites/character.png" 
  alt="キャラクター"
  size="lg"
  shape="rounded"
  [pixelated]="true"
  bgColor="var(--pt-color-surface-secondary)"
  [shadow]="true">
</pt-avatar>
```

### サイズ比較

```html
<pt-avatar src="/img/user.png" alt="User" size="sm"></pt-avatar>
<pt-avatar src="/img/user.png" alt="User" size="md"></pt-avatar>
<pt-avatar src="/img/user.png" alt="User" size="lg"></pt-avatar>
<pt-avatar src="/img/user.png" alt="User" size="xl"></pt-avatar>
```

---

## Design Patterns

### プロフィールカード内

```html
<pt-card>
  <pt-card-header>
    <div class="flex items-center gap-4">
      <pt-avatar 
        src="/images/user.png" 
        alt="田中太郎"
        size="lg"
        shape="circle">
      </pt-avatar>
      <div>
        <h3>田中太郎</h3>
        <p>開発者</p>
      </div>
    </div>
  </pt-card-header>
</pt-card>
```

---

## Related Components

- [pt-icon](./pt-icon.md) - SVGアイコン表示
- [pt-chip](./pt-chip.md) - アイコン+テキストのチップ

---

## References

- [GitHub Primer Avatar](https://primer.style/components/avatar)
- [Material Design 3 - Images](https://m3.material.io/)
