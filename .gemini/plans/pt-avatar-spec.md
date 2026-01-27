# pt-avatar コンポーネント設計仕様

## 概要

画像を表示するためのアバターコンポーネント。ユーザープロフィール画像、サムネイル、アイコン的な画像表示に使用。

**責務**: 画像のサイズ・形状・ピクセルアート対応のみ
**責務外**: 背景色・シャドウなどの装飾（→ 将来の pt-paper で対応）

## ベンチマーク調査

### GitHub Primer Avatar
- **Props**: `src`, `alt`, `size` (number), `square` (boolean)
- **サイズ**: 16px〜64px
- **形状**: Circle（人物）/ Square（組織・Bot）
- **背景色・シャドウ**: なし

### Material Design
- **Props**: `src`, `alt`, `variant` (circular/rounded/square)
- **背景色**: Letter Avatarのみ
- **シャドウ**: なし（Paperコンポーネントで対応）

---

## Props定義

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | 画像のURL |
| `alt` | `string` | **required** | 代替テキスト（アクセシビリティ必須） |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | サイズバリアント |
| `shape` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | 形状 |
| `pixelated` | `boolean` | `false` | ピクセルアート用のレンダリング |

**削除されたProps** (責務分離のため):
- ~~`bgColor`~~ → 使用箇所で親要素を使用
- ~~`shadow`~~ → 将来の pt-paper で対応

---

## サイズバリアント

| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 32x32px | アイコンサイズ、リスト内 |
| `md` | 48x48px | 標準サイズ |
| `lg` | 80x80px | カード内メイン画像（Quiz 画面） |
| `xl` | 120x120px | プロフィール画面など |

---

## 形状バリアント

| Shape | border-radius | Use Case |
|-------|--------------|----------|
| `circle` | 50% | ユーザーアバター |
| `rounded` | `--pt-radius-lg` | サムネイル |
| `square` | `--pt-radius-sm` | ピクセルアート |

---

## 使用例

### 基本的な使用
```html
<pt-avatar 
  src="/images/user.png" 
  alt="ユーザー名"
  size="lg"
  shape="rounded">
</pt-avatar>
```

### Quiz 画面での使用（装飾は親要素で）
```html
<!-- 背景・シャドウは親要素で対応 (将来: pt-paper に置き換え) -->
<div class="bg-slate-50 rounded-xl p-1 shadow-inner">
  <pt-avatar 
    [src]="pokemon.imageUrl" 
    [alt]="pokemon.name"
    size="lg"
    shape="rounded"
    [pixelated]="true">
  </pt-avatar>
</div>
```

---

## アクセシビリティ

- `alt` 属性は必須
- 装飾的な画像の場合は `alt=""` を使用
- `loading="lazy"` によるパフォーマンス最適化

---

## Design Tokens

```scss
// サイズ
--pt-avatar-size-sm: 32px
--pt-avatar-size-md: 48px
--pt-avatar-size-lg: 80px
--pt-avatar-size-xl: 120px

// 形状
--pt-avatar-radius-circle: var(--pt-radius-full)
--pt-avatar-radius-rounded: var(--pt-radius-lg)
--pt-avatar-radius-square: var(--pt-radius-sm)
```

---

## 将来の拡張: pt-paper

背景色・シャドウ（elevation）は `pt-paper` コンポーネントで対応予定。
MUIの[Paper](https://mui.com/material-ui/react-paper/)を参考に設計。

```html
<!-- 将来の実装イメージ -->
<pt-paper elevation="sunken" rounded="lg">
  <pt-avatar src="..." alt="..." size="lg">
  </pt-avatar>
</pt-paper>
```

---

## 関連コンポーネント

- `pt-icon`: アイコン表示（SVG）
- `pt-chip`: アイコン+テキストのチップ
- `pt-paper`: 背景色・シャドウ（将来追加）
