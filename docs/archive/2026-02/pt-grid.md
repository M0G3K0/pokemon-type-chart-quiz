# pt-grid

> CSS Gridベースの規則的なカラムレイアウトプリミティブ

**ベンチマーク**: [MUI Grid](https://mui.com/material-ui/react-grid/) | [Chakra UI SimpleGrid](https://chakra-ui.com/docs/components/simple-grid)

---

## Overview

`pt-grid` は要素を規則的なカラムグリッドに配置するレイアウトコンポーネントです。CSS Gridを使用し、レスポンシブなカラム数変更をサポートします。

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **選択肢ボタン群** | Quiz画面の倍率選択など |
| **カードリスト** | 同じサイズのカードを並べる |
| **ギャラリー** | 画像サムネイル表示 |
| **レスポンシブカラム** | モバイル2列→デスクトップ3列 |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **1列レイアウト** | Gridの意味がない | `pt-stack` |
| **異なるサイズの要素** | Gridは均等配分が前提 | `pt-stack` + CSS |
| **複雑なレイアウト** | 12カラムシステム等 | CSS直接記述 |

---

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `1 \| 2 \| 3 \| 4 \| 6` | `2` | カラム数（モバイル/デフォルト） |
| `smColumns` | `1 \| 2 \| 3 \| 4 \| 6 \| undefined` | `undefined` | sm (640px+) でのカラム数 |
| `gap` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | グリッド間ギャップ |

### Column Options

| Columns | 用途 |
|---------|------|
| `1` | モバイル単一カラム |
| `2` | 選択肢ペア、2択ボタン |
| `3` | Quiz選択肢（デスクトップ） |
| `4` | ギャラリー、アイコン群 |
| `6` | 高密度レイアウト |

### Design Tokens

| Token | Reference | Value | 用途 |
|-------|-----------|-------|------|
| `grid.columns.*` | - | `1-6` | カラム数オプション |
| `grid.gap.none` | - | `0` | ギャップなし |
| `grid.gap.sm` | `{spacing.gap.sm}` | 8px | コンパクト |
| `grid.gap.md` | `{spacing.gap.md}` | 16px | 標準（default） |
| `grid.gap.lg` | `{spacing.gap.lg}` | 24px | ゆったり |

---

## Accessibility

- グリッド自体にはARIA属性不要
- 内包要素の順序がDOMの順序と一致することを確認
- キーボードナビゲーションは内包要素で対応

---

## Examples

### Basic Grid (2 columns)

```html
<pt-grid [columns]="2" gap="md">
  <button>選択肢1</button>
  <button>選択肢2</button>
  <button>選択肢3</button>
  <button>選択肢4</button>
</pt-grid>
```

### Responsive Grid

```html
<pt-grid [columns]="2" [smColumns]="3" gap="md">
  <button *ngFor="let choice of choices">{{ choice }}</button>
</pt-grid>
```

### Card Gallery

```html
<pt-grid [columns]="2" [smColumns]="4" gap="lg">
  <pt-surface *ngFor="let item of items" variant="card" padding="md">
    <img [src]="item.image" [alt]="item.name">
    <p>{{ item.name }}</p>
  </pt-surface>
</pt-grid>
```

---

## Design Patterns

### Quiz Choices (Current Usage)

```html
<pt-grid [columns]="2" [smColumns]="3" gap="md">
  <button *ngFor="let choice of [4, 2, 1, 0.5, 0.25, 0]"
          (click)="selectChoice(choice)">
    {{ choice }}倍
  </button>
</pt-grid>
```

---

## Related Components

- `pt-stack`: 縦/横の積み上げレイアウト
- `pt-surface`: グリッド内カードのスタイリング

---

## References

- [MUI Grid](https://mui.com/material-ui/react-grid/)
- [Chakra UI SimpleGrid](https://chakra-ui.com/docs/components/simple-grid)
- [CSS Grid Layout (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)
