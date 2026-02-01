# pt-type-chip

> Pokemon Type専用のSemantic Wrapper - タイプカラーとアイコンを自動的に適用

**ベンチマーク**: [Material Design 3 Chips](https://m3.material.io/components/chips/overview) | `pt-chip`をラップした専用コンポーネント

---

## Overview

`pt-type-chip`は、`pt-chip`のOrganism（Semantic Wrapper）バージョンで、Pokemon Type専用のロジックを提供します。タイプ名を指定するだけで、適切な背景色とアイコンパスが自動的に設定されます。

**主な特徴**:
- **ドメインロジックの統合**: PokemonTypeに基づく色とアイコンパスを自動解決
- **簡潔なAPI**: `type`を指定するだけで完結
- **pt-chipの柔軟性を継承**: サイズ、角丸、アイコン表示など全てカスタマイズ可能
- **保守性の向上**: タイプカラーの変更が1箇所で完結

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **Pokemon Typeの表示** | ポケモンのタイプを視覚的に表現する |
| **タイプフィルタUI** | タイプでフィルタリングする際の選択項目 |
| **タイプ相性チャート** | 相性表でタイプを識別 |
| **ポケモン詳細** | ポケモンカードやプロフィールでタイプを表示 |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **Pokemon Type以外の用途** | Pokemon Type専用のコンポーネント | 汎用的な用途には`pt-chip`を使用 |
| **カスタム色が必要** | タイプカラーは自動設定される | `pt-chip`で手動指定 |
| **ドメインロジック不要の場合** | 不要な抽象化は複雑性を増す | 直接`pt-chip`を使用 |

---

## Specs

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `type` | `PokemonType` | - | ✅ | Pokemon Typeの種類（例: `'fire'`, `'water'`） |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | - | チップのサイズ |
| `showIcon` | `boolean` | `false` | - | タイプアイコンを表示するか |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'full'` | `'md'` | - | 角の丸み |
| `clickable` | `boolean` | `false` | - | クリック可能状態にするか |
| `iconSize` | `'sm' \| 'md' \| 'lg' \| undefined` | - | - | アイコンサイズの上書き |
| `textColor` | `string` | `'var(--pt-color-text-inverse)'` | - | テキスト色の上書き |

### Computed Properties

| Property | Type | Description |
|----------|------|-------------|
| `iconPath` | `string` | `/icons/${type}.svg` 形式で自動生成 |
| `bgColor` | `string` | `var(--pt-color-pokemon-${type}-500)` 形式で自動生成 |

---

## Accessibility

`pt-chip`のアクセシビリティ機能を継承：
- **セマンティック**: テキストコンテンツはスクリーンリーダーで読み上げられる
- **色のコントラスト**: Pokemon Typeカラーは十分なコントラストを持つよう設計
- **明確なラベル**: タイプ名をテキストで表示（アイコンのみの場合は`aria-label`推奨）

---

## Examples

### アイコンのみ（現在のpt-type-iconと同等）

```html
<pt-type-chip 
  [type]="'fire'" 
  [showIcon]="true" 
  rounded="full">
</pt-type-chip>
```

### テキストのみ（現在のtype-badgeと同等）

```html
<pt-type-chip [type]="'fire'">ほのお</pt-type-chip>
```

### アイコン + テキスト（新機能）

```html
<pt-type-chip 
  [type]="'fire'" 
  [showIcon]="true">
  ほのお
</pt-type-chip>
```

### サイズバリエーション

```html
<!-- Small -->
<pt-type-chip [type]="'water'" size="sm">みず</pt-type-chip>

<!-- Medium (default) -->
<pt-type-chip [type]="'grass'" size="md">くさ</pt-type-chip>

<!-- Large -->
<pt-type-chip [type]="'electric'" size="lg">でんき</pt-type-chip>
```

### クリック可能なタイプフィルタ

```html
<pt-type-chip 
  [type]="'dragon'" 
  [showIcon]="true"
  [clickable]="true"
  (click)="onTypeFilter('dragon')"
  rounded="full">
  ドラゴン
</pt-type-chip>
```

---

## Design Patterns

### Type Badge Pattern (ポケモンカード)

ポケモンカードでタイプを表示する標準パターン：

```html
<div class="pokemon-card">
  <img [src]="pokemon.imageUrl" [alt]="pokemon.name">
  <h3>{{ pokemon.name }}</h3>
  <div class="pokemon-types">
    <pt-type-chip 
      *ngFor="let type of pokemon.types"
      [type]="type"
      size="sm">
      {{ getTypeLabel(type) }}
    </pt-type-chip>
  </div>
</div>
```

### Icon-Only Pattern (コンパクト表示)

スペースが限られている場合のアイコンのみ表示：

```html
<div class="type-icons">
  <pt-type-chip 
    *ngFor="let type of pokemon.types"
    [type]="type"
    [showIcon]="true"
    rounded="full"
    size="sm">
  </pt-type-chip>
</div>
```

### Type Filter Pattern

タイプでフィルタリングするUIパターン：

```html
<div class="type-filter">
  <pt-type-chip 
    *ngFor="let type of allTypes"
    [type]="type"
    [showIcon]="true"
    [clickable]="true"
    [class.selected]="selectedTypes.includes(type)"
    (click)="toggleType(type)"
    rounded="full">
    {{ getTypeLabel(type) }}
  </pt-type-chip>
</div>
```

---

## Migration Guide

### pt-type-icon からの移行

**Before (pt-type-icon):**
```html
<pt-type-icon [type]="'fire'" size="md"></pt-type-icon>
```

**After (pt-type-chip):**
```html
<pt-type-chip [type]="'fire'" [showIcon]="true" rounded="full"></pt-type-chip>
```

### app-type-badge からの移行

**Before (app-type-badge):**
```html
<app-type-badge [type]="'fire'" size="sm">ほのお</app-type-badge>
```

**After (pt-type-chip):**
```html
<pt-type-chip [type]="'fire'" size="sm">ほのお</pt-type-chip>
```

---

## Related Components

- `pt-chip`: 汎用的なChipコンポーネント（Molecule）
- `pt-icon`: アイコン表示コンポーネント（Atom）
- `app-type-badge`: 旧実装（非推奨、将来削除予定）
- `pt-type-icon`: 旧実装（非推奨、将来削除予定）

---

## Implementation Details

### Type-to-Color Mapping

タイプカラーは以下のデザイントークンで管理：

```scss
--pt-color-pokemon-fire-500: #F08030;
--pt-color-pokemon-water-500: #6890F0;
--pt-color-pokemon-grass-500: #78C850;
// ... 他のタイプカラー
```

### Icon Path Convention

アイコンは以下の命名規則に従う：

```
/icons/{type}.svg
```

例: `/icons/fire.svg`, `/icons/water.svg`

---

## References

- [Material Design 3: Chips](https://m3.material.io/components/chips/overview)
- [pt-chip Documentation](./pt-chip.md)
- [Design Tokens: Pokemon Type Colors](/design-tokens/tier2-semantic/pokemon.json)
