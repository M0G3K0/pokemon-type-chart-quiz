# pt-avatar

> **Molecule**: 画像を表示するためのアバターコンポーネント

ユーザープロフィール画像、サムネイル、アイコン的な画像表示に使用します。

**責務**: 画像のサイズ・形状・ピクセルアート対応のみ
**責務外**: 背景色・シャドウ（→ 将来の pt-paper で対応）

---

## Overview

`pt-avatar` は、画像を一貫したサイズ・形状で表示するための Molecule コンポーネントです。ピクセルアート表示にも対応し、レトロゲームのスプライトなどの表示に最適化されています。

GitHub Primer や Material Design の Avatar を参考に、**コア機能のみに集中**しています。背景色やシャドウなどの装飾は、使用箇所の責任として親要素または将来の `pt-paper` コンポーネントで対応します。

---

## When to use ✅

- ユーザーやアイテムを表す画像を表示する場合
- サムネイル画像を統一されたサイズで表示する場合
- ピクセルアート（ドット絵）を鮮明に表示する場合

---

## When not to use ❌

- 装飾的な背景画像 → 通常の `<img>` や CSS background を使用
- アイコン（SVG）の表示 → `pt-icon` を使用
- 背景色やシャドウが必要な場合 → 親要素で対応（将来: `pt-paper`）

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
// サイズ
--pt-avatar-size-sm
--pt-avatar-size-md
--pt-avatar-size-lg
--pt-avatar-size-xl

// 形状
--pt-avatar-radius-circle
--pt-avatar-radius-rounded
--pt-avatar-radius-square
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

### ピクセルアート表示（背景は親要素で）

```html
<!-- 背景・シャドウは親要素で対応 (将来: pt-paper に置き換え) -->
<div class="bg-slate-50 rounded-xl p-1 shadow-inner">
  <pt-avatar 
    src="/sprites/character.png" 
    alt="キャラクター"
    size="lg"
    shape="rounded"
    [pixelated]="true">
  </pt-avatar>
</div>
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

### 将来: pt-paper との組み合わせ

```html
<!-- pt-paper 導入後のイメージ -->
<pt-paper elevation="sunken" rounded="lg">
  <pt-avatar 
    src="/images/user.png" 
    alt="田中太郎"
    size="lg"
    shape="rounded">
  </pt-avatar>
</pt-paper>
```

---

## Related Components

- [pt-icon](./pt-icon.md) - SVGアイコン表示
- [pt-chip](./pt-chip.md) - アイコン+テキストのチップ
- **pt-paper** - 背景色・シャドウ（将来追加）

---

## References

- [GitHub Primer Avatar](https://primer.style/components/avatar)
- [Material UI Paper](https://mui.com/material-ui/react-paper/)
