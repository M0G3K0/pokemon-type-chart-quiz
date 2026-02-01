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

---

## FeedbackState 選択ガイド

クイズやテストの結果表示に使用するフィードバック状態です。

### None（デフォルト）

**使用する場面:**
- **回答前・選択中**
- フィードバックがまだ不要な場合

```html
<pt-radio-button [selected]="true">
  ほのお
</pt-radio-button>
```

### Correct

**使用する場面:**
- **ユーザーが正解を選択した場合**
- 緑色の背景で「正解！」を表現

```html
<pt-radio-button [selected]="true" feedbackState="correct">
  ほのお ✓
</pt-radio-button>
```

### Wrong

**使用する場面:**
- **ユーザーが不正解を選択した場合**
- 赤色の背景で「間違い」を表現

```html
<pt-radio-button [selected]="true" feedbackState="wrong">
  でんき ✗
</pt-radio-button>
```

### Actual

**使用する場面:**
- **ユーザーが間違えた時、正解がどれかを示す**
- 緑の枠線で「本当の正解はこちら」を表現
- Wrong と組み合わせて使用

```html
<!-- ユーザーの選択（間違い） -->
<pt-radio-button feedbackState="wrong">でんき</pt-radio-button>

<!-- 正解の選択肢 -->
<pt-radio-button feedbackState="actual">ほのお</pt-radio-button>
```

---

## クイズでの使用パターン

```typescript
// QuizComponent での使用例
getChoiceFeedbackState(choice: string): FeedbackState {
  if (!this.isAnswered) return 'none';
  
  if (choice === this.correctAnswer) {
    return choice === this.selectedAnswer ? 'correct' : 'actual';
  }
  
  return choice === this.selectedAnswer ? 'wrong' : 'none';
}
```

```html
@for (choice of choices; track choice) {
  <pt-radio-button
    [selected]="choice === selectedAnswer"
    [feedbackState]="getChoiceFeedbackState(choice)"
    (click)="selectChoice(choice)">
    {{ choice }}
  </pt-radio-button>
}
```

---

## pt-button との使い分け

| 判断基準 | 選択 |
|----------|------|
| 複数選択肢から1つを選ぶ | `pt-radio-button` |
| アクションを実行する | `pt-button` |
| 選択後にフィードバックが必要 | `pt-radio-button` |
| 選択後に画面遷移する | `pt-button` |

---

## Accessibility

- `role="radio"` / `role="radiogroup"`を自動付与
- `aria-checked`で選択状態を表現
- キーボード操作: `Tab`でフォーカス、`Space`/`Enter`で選択
- フォーカスリング表示（`:focus-visible`）

## Related Components

- `pt-grid`: 選択肢のグリッドレイアウトに使用
- `pt-text`: 選択肢内のテキスト表示に使用
- `pt-button`: アクション用ボタン（責務が異なる）
