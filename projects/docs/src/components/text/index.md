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

## Accessibility

- 色のコントラスト比はTier 2 color tokensにより4.5:1以上を保証
- `transform="uppercase"`は視覚的な変換のみ（スクリーンリーダーの読み上げには影響しません）
- `element="label"`を使用する場合は、関連するフォームコントロールと紐付けてください

## Related Components

- `pt-heading`: 構造的な見出し（h1-h6）用
- `pt-button`: ボタン内テキスト（内部でタイポグラフィを処理）
- `pt-chip`: 背景付きの小さなラベルコンテンツ
