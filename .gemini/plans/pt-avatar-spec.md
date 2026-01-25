# pt-avatar コンポーネント設計仕様

## 概要

画像を表示するためのアバターコンポーネント。ポケモンのスプライト、ユーザープロフィール画像などに使用。

## ベンチマーク調査

### GitHub Primer Avatar
- **Props**: `src`, `alt`, `size` (number), `square` (boolean)
- **サイズ**: 16px〜64px（base-4/base-8スケール）
- **形状**: Circle（人物）/ Square（組織・Bot）
- **特徴**: シンプルで最小限のAPI

### Material Design 3
- 明示的な Avatar コンポーネントはないが、Image + Container パターンを使用

### 考慮事項
- ポケモンスプライトはピクセルアートなので `image-rendering: pixelated` が必要
- 背景色・影の有無で視認性を調整

---

## Props定義

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | 画像のURL |
| `alt` | `string` | **required** | 代替テキスト（アクセシビリティ必須） |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | サイズバリアント |
| `shape` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | 形状 |
| `pixelated` | `boolean` | `false` | ピクセルアート用のレンダリング |
| `bgColor` | `string` | `undefined` | 背景色（CSSカスタムプロパティ推奨） |
| `shadow` | `boolean` | `false` | 影の有無 |

---

## サイズバリアント

| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 32x32px | アイコンサイズ、リスト内 |
| `md` | 48x48px | 標準サイズ |
| `lg` | 80x80px | カード内メイン画像（現在の Quiz 画面） |
| `xl` | 120x120px | プロフィール画面など |

---

## 形状バリアント

| Shape | border-radius | Use Case |
|-------|--------------|----------|
| `circle` | 50% | ユーザーアバター |
| `rounded` | `--pt-radius-lg` | カード内のサムネイル |
| `square` | `--pt-radius-sm` | ピクセルアート、ドット絵 |

---

## 使用例

### 基本的な使用
```html
<pt-avatar 
  src="/sprites/pikachu.png" 
  alt="ピカチュウ"
  size="lg"
  shape="rounded"
  [pixelated]="true">
</pt-avatar>
```

### Quiz 画面での使用（現在の実装を置換）
```html
<!-- Before -->
<div class="bg-slate-50 rounded-xl p-1 shadow-inner">
  <img [src]="pokemon.imageUrl" [alt]="pokemon.name"
       class="w-20 h-20 object-contain [image-rendering:pixelated]">
</div>

<!-- After -->
<pt-avatar 
  [src]="pokemon.imageUrl" 
  [alt]="pokemon.name"
  size="lg"
  shape="rounded"
  [pixelated]="true"
  bgColor="var(--pt-color-surface-secondary)"
  [shadow]="true">
</pt-avatar>
```

---

## アクセシビリティ

- `alt` 属性は必須（空文字列も許容するが、意味のあるテキストを推奨）
- 装飾的な画像の場合は `alt=""` を使用
- フォーカス可能な要素ではない（単なる画像表示）

---

## Design Tokens使用

```scss
// サイズ
--pt-size-avatar-sm: 32px;
--pt-size-avatar-md: 48px;
--pt-size-avatar-lg: 80px;
--pt-size-avatar-xl: 120px;

// 形状
--pt-radius-sm, --pt-radius-lg, --pt-radius-full

// 背景・影
--pt-color-surface-secondary: 背景色
--pt-shadow-inner: インナーシャドウ
```

---

## ファイル構成

```
src/app/ui/pt-avatar/
├── pt-avatar.ts        # Component class
├── pt-avatar.html      # Template
├── pt-avatar.scss      # Styles
└── pt-avatar.spec.ts   # Unit tests
```

---

## 関連コンポーネント

- `pt-icon`: アイコン表示（SVG/画像）
- `pt-chip`: アイコン+テキストのチップ
