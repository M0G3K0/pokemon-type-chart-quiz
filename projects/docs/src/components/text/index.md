---
title: Guidelines
---

> 本文・ラベル・補助テキスト用のタイポグラフィコンポーネント

## Overview

`pt-text`は、Design Tokens（Tier 2）に基づいた一貫したタイポグラフィスタイルをテキストコンテンツに適用するAtomレベルのコンポーネントです。`.quiz-phase-label`や`.pokemon-name`のような独自CSSクラスの撲滅を目的としています。

**主な特徴**:
- **6種類のvariant**: body-lg, body-md, body-sm, label-md, label-sm, label-xs
- **5種類のcolor**: primary, secondary, disabled, inverse, danger
- **4種類のweight**: normal, medium, bold, black
- **出力要素の選択**: span, p, div, label

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **本文テキスト、段落** | body-*バリエーションを使用 |
| **ラベル、キャプション** | label-*バリエーションを使用 |
| **メタデータ、ステータス表示** | label-xs + color=secondaryなど |

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **構造的な見出し (h1-h6)** | セマンティクスが必要 | `pt-heading`を使用 |
| **ボタン内テキスト** | ボタンが責務を持つ | `pt-button`を使用 |
| **リンク** | リンクの責務 | 将来の`pt-link`を使用 |

---

## Variant 選択ガイド

### Body 系（本文）

| Variant | サイズ | 用途 |
|---------|--------|------|
| `body-lg` | 18px | 強調された本文、リード文 |
| `body-md` | 16px | 標準の本文（デフォルト） |
| `body-sm` | 14px | 補足テキスト、注釈 |

### Label 系（ラベル）

| Variant | サイズ | 用途 |
|---------|--------|------|
| `label-md` | 14px | フォームラベル、セクション名 |
| `label-sm` | 12px | 小さなラベル、タグ風テキスト |
| `label-xs` | 10px | キャプション、メタデータ |

### 使用例

```html
<!-- 本文 -->
<pt-text variant="body-md">
  ポケモンのタイプ相性を学びましょう。
</pt-text>

<!-- ラベル -->
<pt-text variant="label-sm" color="secondary">
  第1世代
</pt-text>
```

---

## Color 選択ガイド

| Color | 用途 |
|-------|------|
| `primary` | **標準テキスト**（デフォルト） |
| `secondary` | **控えめなテキスト**。補足情報、メタデータ |
| `disabled` | **無効状態**。操作不可を示す |
| `inverse` | **反転テキスト**。暗い背景上の白テキスト |
| `danger` | **エラー・警告**。バリデーションエラーなど |

### 使用例

```html
<!-- 標準テキスト -->
<pt-text color="primary">メインの説明</pt-text>

<!-- 補足テキスト -->
<pt-text color="secondary">※ 注意事項</pt-text>

<!-- エラーメッセージ -->
<pt-text color="danger">入力が必要です</pt-text>
```

---

## Weight 選択ガイド

| Weight | 値 | 用途 |
|--------|------|------|
| `normal` | 400 | 本文（デフォルト） |
| `medium` | 500 | やや強調 |
| `bold` | 700 | 強調、重要な情報 |
| `black` | 900 | 最も強い強調 |

```html
<!-- 強調テキスト -->
<pt-text weight="bold">重要なお知らせ</pt-text>
```

---

## Element 選択ガイド

| Element | HTML出力 | 用途 |
|---------|----------|------|
| `span` | `<span>` | インラインテキスト（デフォルト） |
| `p` | `<p>` | 段落 |
| `div` | `<div>` | ブロック要素 |
| `label` | `<label>` | フォームラベル |

```html
<!-- 段落として出力 -->
<pt-text element="p" variant="body-md">
  これは段落テキストです。
</pt-text>

<!-- フォームラベルとして出力 -->
<pt-text element="label" variant="label-md" for="name">
  名前
</pt-text>
```

---

## pt-heading との使い分け

| 判断基準 | 選択 |
|----------|------|
| セクションの開始（h1-h6） | `pt-heading` |
| 本文・説明テキスト | `pt-text` |
| ラベル・キャプション | `pt-text` |
| スクリーンリーダーのナビゲーション | `pt-heading` |

---

## Accessibility

- 色のコントラスト比はTier 2 color tokensにより4.5:1以上を保証
- `transform="uppercase"`は視覚的な変換のみ（スクリーンリーダーの読み上げには影響しません）
- `element="label"`を使用する場合は、関連するフォームコントロールと紐付けてください

## Related Components

- `pt-heading`: 構造的な見出し（h1-h6）用
- `pt-button`: ボタン内テキスト（内部でタイポグラフィを処理）
- `pt-chip`: 背景付きの小さなラベルコンテンツ
