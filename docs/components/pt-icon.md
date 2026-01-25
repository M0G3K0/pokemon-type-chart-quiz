# pt-icon

> アイコンの表示コンポーネント（SVG、画像）。背景色、サイズ、形状をカスタマイズ可能。

**ベンチマーク**: [GitHub Primer Icon](https://primer.style/design/components/icon) | [Material Design 3 Icons](https://m3.material.io/styles/icons/overview)

---

## Overview

`pt-icon` は、SVGや画像ベースのアイコンを統一的に表示するためのコンポーネントです。サイズ、背景色、形状（円形/角丸）を柔軟に設定できます。

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **タイプアイコン** | ポケモンのタイプを視覚的に表示 |
| **状態インジケーター** | 成功/失敗/警告などの状態を表示 |
| **ナビゲーション** | 矢印、メニューアイコン |
| **装飾** | カードやボタンの視覚的アクセント |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **大量のアイコンを同時表示** | パフォーマンス低下の可能性 | アイコンフォントやSVGスプライトを検討 |
| **テキストの代替として単独使用** | アクセシビリティ問題 | 必ずラベルや `aria-label` を併用 |
| **複雑なイラスト** | アイコンは簡潔であるべき | `pt-avatar` や `<img>` を使用 |

---

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | - | アイコン名（将来のSVGライブラリ用） |
| `src` | `string` | - | 画像URL |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | アイコンサイズ |
| `color` | `string` | - | アイコンの色（SVG用） |
| `bgColor` | `string` | - | 背景色 |
| `rounded` | `boolean` | `false` | 背景を円形にするか |

### Size Tokens

| Size | Container | Icon Image | 用途 |
|------|-----------|------------|------|
| `sm` | `--spacing-4` (16px) | `--spacing-3` (12px) | インライン、バッジ内 |
| `md` | `--spacing-12` (48px) | `--spacing-6` (24px) | カード、セクション |
| `lg` | `--spacing-16` (64px) | `--spacing-8` (32px) | ヒーロー、アバター代替 |

---

## Accessibility

- `alt=""` をデフォルトで設定（装飾用アイコンとして扱う）
- 意味のあるアイコンの場合は、親要素に `aria-label` や説明テキストを追加すること
- 背景色とアイコンのコントラスト比を確保

---

## Examples

### Basic Usage

```html
<pt-icon [src]="'/icons/fire.svg'"></pt-icon>
```

### With Background Color (Type Icon)

```html
<pt-icon 
  [src]="'/icons/fire.svg'" 
  size="md" 
  [bgColor]="'var(--color-type-fire)'"
  [rounded]="true">
</pt-icon>
```

### Different Sizes

```html
<pt-icon [src]="'/icons/star.svg'" size="sm"></pt-icon>
<pt-icon [src]="'/icons/star.svg'" size="md"></pt-icon>
<pt-icon [src]="'/icons/star.svg'" size="lg"></pt-icon>
```

### With Custom Color

```html
<pt-icon 
  [src]="'/icons/arrow-right.svg'" 
  size="lg" 
  [color]="'slate-200'">
</pt-icon>
```

---

## Design Patterns

### Type Icon Pattern

ポケモンのタイプアイコンは、背景色付き・円形で統一します。

```html
<pt-icon 
  [src]="'/icons/' + type + '.svg'" 
  size="md" 
  [bgColor]="'var(--color-type-' + type + ')'"
  [rounded]="true">
</pt-icon>
```

### Inline Icon Pattern

テキストと一緒に使用する場合は `sm` サイズ、背景なしで使用します。

```html
<div class="flex items-center gap-2">
  <pt-icon [src]="'/icons/info.svg'" size="sm"></pt-icon>
  <span>詳細情報</span>
</div>
```

---

## Related Components

- `pt-avatar`: 画像の表示（プロフィール、ポケモン）
- `pt-badge`: ラベル表示

---

## References

- [GitHub Primer Icon](https://primer.style/design/components/icon)
- [Material Design 3: Icons](https://m3.material.io/styles/icons/overview)
- [SmartHR: Icon](https://smarthr.design/products/components/icon/)
