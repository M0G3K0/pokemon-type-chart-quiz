---
title: Guidelines
---

# Type Chip

> Pokemon Type専用のSemantic Wrapper - タイプカラーとアイコンを自動的に適用

`pt-type-chip`は、`pt-chip`をラップしたOrganism（ドメイン特化）コンポーネントです。タイプ名を指定するだけで、適切な背景色（`--pt-color-pokemon-{type}-500`）とアイコンパス（`/icons/{type}.svg`）が自動的に設定されます。

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **Pokemon Typeの表示** | ポケモンのタイプを視覚的に表現する |
| **タイプ相性チャート** | 相性表でタイプを識別 |
| **ポケモン詳細** | ポケモンカードやプロフィールでタイプを表示 |

---

## When not to use ❌

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **Pokemon Type以外の用途** | Pokemon Type専用のコンポーネント | `pt-chip`を使用 |
| **カスタム色が必要** | タイプカラーは自動設定される | `pt-chip`で手動指定 |

---

## Architecture

```
pt-type-chip (Organism - Domain Wrapper)
  └── pt-chip (Molecule - Generic)
        └── pt-icon (Atom)
```

`pt-type-chip`は以下の値を自動計算：
- **bgColor**: `var(--pt-color-pokemon-${type}-500)`
- **iconPath**: `/icons/${type}.svg`
