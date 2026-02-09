# pt-chip

> 小さな情報単位を視覚的に表現するコンパクトなコンポーネント

**ベンチマーク**: [Material Design 3 Chips](https://m3.material.io/components/chips/overview) | [GitHub Primer Labels](https://primer.style/components/label) | [SmartHR Tag](https://smarthr.design/products/components/tag/)

---

## Overview

`pt-chip`は、タグ、ラベル、フィルタ、選択項目など、小さな情報を視覚的に表現するためのMoleculeレベルのコンポーネントです。Material Design 3のChipsパターンに準拠し、アイコンとテキストの柔軟な組み合わせをサポートします。

**主な特徴**:
- **柔軟な構成**: アイコンのみ、テキストのみ、アイコン+テキストの全パターンに対応
- **カスタマイズ可能**: 背景色、テキスト色、角の丸み、サイズを自由に設定
- **デザイントークン対応**: 全スタイルがDesign Tokensに基づいて実装

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **タグ・ラベル表示** | カテゴリー、ステータス、属性などの小さな情報を表示する |
| **コンパクトな選択肢** | 限定的な選択肢を小さなスペースに表示 |
| **アイコン+テキストの組み合わせ** | アイコンで直感的に理解でき、テキストで詳細を補足 |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **長いテキストの表示** | Chipは短い情報向けに最適化されている | `pt-card`や通常のテキスト表示を使用 |
| **主要なアクション** | Chipはあくまで情報表示が主目的 | 主要なアクションには`pt-button`を使用 |
| **大量の情報** | 多数のChipは視覚的に煩雑になる | リスト形式や別のUIパターンを検討 |
| **階層的な選択** | Chipは単一レベルの情報表示向け | ドロップダウンやツリービューを使用 |

---

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | チップのサイズ |
| `bgColor` | `string \| undefined` | - | 背景色（CSS変数または色コード） |
| `textColor` | `string` | `'var(--pt-color-text-inverse)'` | テキスト色（CSS変数または色コード） |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'full'` | `'md'` | 角の丸み |
| `icon` | `string \| undefined` | - | 左側に表示するアイコンのパス |
| `iconSize` | `'sm' \| 'md' \| 'lg' \| undefined` | - | アイコンサイズの上書き（未指定時は`size`に応じて自動調整） |
| `iconOnly` | `boolean` | `false` | アイコンのみモード（均等パディングで正方形になる） |

### Size Tokens

| Size | Padding | Font Size | 用途 |
|------|---------|-----------|------|
| `sm` | `var(--pt-space-1) var(--pt-space-2)` | `var(--pt-font-size-xs)` | インライン表示、狭いスペース |
| `md` | `var(--pt-space-2) var(--pt-space-3)` | `var(--pt-font-size-sm)` | 標準的な使用（デフォルト） |
| `lg` | `var(--pt-space-3) var(--pt-space-4)` | `var(--pt-font-size-base)` | 強調表示、大きなタッチターゲット |

### Rounded Tokens

| Rounded | Border Radius | 用途 |
|---------|---------------|------|
| `none` | `0` | 直角のスタイル |
| `sm` | `var(--pt-border-radius-sm)` | 軽く丸い角 |
| `md` | `var(--pt-border-radius-md)` | 標準的な丸み（デフォルト） |
| `full` | `9999px` | 完全な丸型（ピル形状） |

---

## Accessibility

- **セマンティック**: テキストコンテンツは`<span>`でラップされ、スクリーンリーダーで読み上げられる
- **色のコントラスト**: `textColor`はデフォルトで`var(--pt-color-text-inverse)`を使用し、背景とのコントラストを確保

---

## Examples

### アイコンのみ（円形背景）

```html
<pt-chip 
  [icon]="'/icons/fire.svg'"
  [bgColor]="'var(--pt-color-pokemon-fire-500)'"
  rounded="full"
  size="md">
</pt-chip>
```

### テキストのみ

```html
<pt-chip 
  [bgColor]="'var(--pt-color-pokemon-fire-500)'"
  rounded="md"
  size="sm">
  ほのお
</pt-chip>
```

### アイコン + テキスト

```html
<pt-chip 
  [icon]="'/icons/fire.svg'"
  [bgColor]="'var(--pt-color-pokemon-fire-500)'"
  rounded="full"
  size="md">
  ほのお
</pt-chip>
```

---

## Design Patterns

### Icon-First Pattern

アイコンを主役にし、テキストを補助的に使用するパターン：

```html
<pt-chip 
  [icon]="'/icons/star.svg'"
  [bgColor]="'var(--pt-color-warning-500)'"
  rounded="full"
  size="lg">
  お気に入り
</pt-chip>
```

### Status Indicator Pattern

ステータスを色とテキストで明確に表現するパターン：

```html
<pt-chip 
  [bgColor]="status === 'active' ? 'var(--pt-color-success-500)' : 'var(--pt-color-slate-400)'"
  rounded="md"
  size="sm">
  {{ status === 'active' ? 'アクティブ' : '非アクティブ' }}
</pt-chip>
```

---

## Related Components

- `pt-icon`: Chipの中で使用されるアイコンコンポーネント（Atom）
- `pt-type-chip`: Pokemon Type専用のSemantic Wrapper（Organism）
- `pt-badge`: より汎用的なバッジコンポーネント（将来的に統合検討）
- `pt-button`: 主要なアクションには`pt-button`を使用

---

## References

- [Material Design 3: Chips](https://m3.material.io/components/chips/overview)
- [GitHub Primer: Labels](https://primer.style/components/label)
- [SmartHR Design System: Tag](https://smarthr.design/products/components/tag/)
- [Adobe Spectrum: Tag](https://spectrum.adobe.com/page/tag/)
