---
title: Guidelines
---

> 複数の選択肢から1つを選択するRadioButtonパターンを提供するコンポーネント

## Overview

`pt-radio-button`は単一選択肢を表すラジオボタンコンポーネントです。`pt-radio-group`と組み合わせて使用するか、単独でQuizの選択肢ボタンなど、フィードバック状態（正解/不正解）を表示する用途に使用します。

**主な特徴**:
- **feedbackState**: 正解/不正解などの検証結果を視覚的に表現
- **pt-radio-groupとの連携**: グループ内で選択状態を管理
- **アクセシビリティ対応**: `role="radio"`、キーボード操作

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **Quiz/テストの選択肢** | 正解/不正解のフィードバックを視覚的に表示 |
| **フォームでの単一選択** | 複数の選択肢から1つを選ぶ |
| **設定画面のオプション** | 難易度選択、表示モード切替など |

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **複数選択** | RadioButtonは単一選択専用 | `pt-checkbox`（将来実装） |
| **即時反映のビュー切替** | フォーム入力向け | `pt-tab-bar`（将来実装） |
| **選択肢が多すぎる場合** | 一覧性が低下 | `pt-select`（将来実装） |

## Accessibility

- `role="radio"` / `role="radiogroup"`を自動付与
- `aria-checked`で選択状態を表現
- キーボード操作: `Tab`でフォーカス、`Space`/`Enter`で選択
- フォーカスリング表示（`:focus-visible`）

## Related Components

- `pt-grid`: 選択肢のグリッドレイアウトに使用
- `pt-text`: 選択肢内のテキスト表示に使用
- `pt-button`: アクション用ボタン（責務が異なる）
