---
title: Guidelines
---

> Pokemon Type専用のSemantic Wrapper - タイプカラーとアイコンを自動的に適用

## Overview

`pt-type-chip`は、`pt-chip`をラップしたOrganism（ドメイン特化）コンポーネントです。タイプ名を指定するだけで、Tier 3 トークン（`--pt-type-chip-color-{type}-bg/text`）から適切な背景色・テキスト色がCSS変数経由で注入され、アイコンパス（`/icons/{type}.svg`）が自動的に設定されます。

**主な特徴**:
- **タイプカラー自動適用**: 18種類のポケモンタイプに対応
- **アイコン自動設定**: タイプに応じたSVGアイコンを表示
- **サイズバリエーション**: sm, md
- **表示モード**: アイコン+テキスト、アイコンのみ、テキストのみ

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **Pokemon Typeの表示** | ポケモンのタイプを視覚的に表現する |
| **タイプ相性チャート** | 相性表でタイプを識別 |
| **ポケモン詳細** | ポケモンカードやプロフィールでタイプを表示 |
| **クイズの選択肢** | タイプを選択肢として表示 |

## When not to use ❌

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **Pokemon Type以外の用途** | Pokemon Type専用のコンポーネント | `pt-chip`を使用 |
| **カスタム色が必要** | タイプカラーは自動設定される | `pt-chip`で手動指定 |
| **カスタムアイコンが必要** | アイコンは自動設定される | `pt-chip`で手動指定 |

---

## Variant (Type) 選択ガイド

18種類のポケモンタイプに対応：

| タイプ | 背景色 | 用途 |
|--------|--------|------|
| `normal` | グレー | 通常タイプ |
| `fire` | オレンジ | ほのおタイプ |
| `water` | ブルー | みずタイプ |
| `grass` | グリーン | くさタイプ |
| `electric` | イエロー | でんきタイプ |
| `ice` | シアン | こおりタイプ |
| `fighting` | レッド | かくとうタイプ |
| `poison` | パープル | どくタイプ |
| `ground` | ブラウン | じめんタイプ |
| `flying` | スカイブルー | ひこうタイプ |
| `psychic` | ピンク | エスパータイプ |
| `bug` | ライムグリーン | むしタイプ |
| `rock` | ダークブラウン | いわタイプ |
| `ghost` | ダークパープル | ゴーストタイプ |
| `dragon` | インディゴ | ドラゴンタイプ |
| `dark` | ダークグレー | あくタイプ |
| `steel` | シルバー | はがねタイプ |
| `fairy` | ピンク | フェアリータイプ |

### 使用例

```html
<pt-type-chip variant="fire">ほのお</pt-type-chip>
<pt-type-chip variant="water">みず</pt-type-chip>
<pt-type-chip variant="grass">くさ</pt-type-chip>
```

---

## Size 選択ガイド

| サイズ | Padding | Font | 用途 |
|--------|---------|------|------|
| `sm` | 4px | 12px | 密なリスト、タイプ相性表のセル |
| `md` | 6px | 14px | 標準（デフォルト）、ポケモン詳細画面 |

### 使用例

```html
<!-- 相性表のセル（コンパクト） -->
<pt-type-chip type="fire" size="sm">ほのお</pt-type-chip>

<!-- 標準 -->
<pt-type-chip type="fire" size="md">ほのお</pt-type-chip>
```

---

## 表示モード選択ガイド

### アイコン + テキスト（デフォルト）

```html
<pt-type-chip variant="fire">ほのお</pt-type-chip>
```

### アイコンのみ

```html
<pt-type-chip variant="fire" [showLabel]="false"></pt-type-chip>
```

### テキストのみ

```html
<pt-type-chip variant="fire" [showIcon]="false">ほのお</pt-type-chip>
```

---

## Architecture

```
pt-type-chip (Organism - Domain Wrapper)
  └── pt-chip (Molecule - Generic)
        └── pt-icon (Atom)
```

`pt-type-chip`は以下の値をTier 3トークンから自動注入：
- **--pt-chip-bg**: `var(--pt-type-chip-color-{type}-bg)` （type-chip.jsonで定義）
- **--pt-chip-text**: `var(--pt-type-chip-color-{type}-text)` （type-chip.jsonで定義）
- **iconPath**: `/icons/${type}.svg`

---

## pt-chip との使い分け

| 判断基準 | 選択 |
|----------|------|
| ポケモンタイプを表示 | `pt-type-chip` |
| 汎用タグ/ラベル | `pt-chip` |
| タイプカラー自動適用 | `pt-type-chip` |
| カスタム背景色が必要 | `pt-chip`（CSS変数で注入） |

---

## Accessibility

- アイコンは装飾的なため `alt=""` が設定されます
- テキストラベルがスクリーンリーダーで読み上げられます
- `showLabel="false"` の場合は `aria-label` を追加してください

## Related Components

- `pt-chip`: 汎用のChipコンポーネント（Molecule）
- `pt-icon`: アイコン表示（Atom）
