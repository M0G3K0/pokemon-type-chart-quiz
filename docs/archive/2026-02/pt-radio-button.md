# pt-radio-button

> 複数の選択肢から1つを選択する RadioButton パターンを提供するコンポーネント

**ベンチマーク**: [SmartHR RadioButton](https://smarthr.design/products/components/radio-button/) | [GitHub Primer SegmentedControl](https://primer.style/components/segmented-control) | [Material Design 3 Segmented Button](https://m3.material.io/components/segmented-buttons/overview)

---

## Overview

`pt-radio-button` は単一選択肢を表すラジオボタンコンポーネントです。`pt-radio-group` と組み合わせて使用するか、単独で Quiz の選択肢ボタンなど、フィードバック状態（正解/不正解）を表示する用途に使用します。

HTML の `input[type="radio"]` と同等のセマンティクスを持ち、アクセシビリティに配慮した実装となっています。

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **Quiz/テストの選択肢** | 正解/不正解のフィードバックを視覚的に表示する必要がある場合 |
| **フォームでの単一選択** | 複数の選択肢から1つを選ぶ入力フィールド |
| **設定画面のオプション** | 難易度選択、表示モード切替など |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **複数選択** | RadioButtonは単一選択専用 | `pt-checkbox` (将来実装) |
| **即時反映のビュー切替** | RadioButtonはフォーム入力向け | `pt-tab-bar` または `pt-segmented-control` (将来実装) |
| **選択肢が多すぎる場合** | 一覧性が低下する | `pt-select` または `pt-combobox` (将来実装) |

---

## Specs

### pt-radio-button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `T` (generic) | **required** | 選択肢の値。pt-radio-group の value と比較される |
| `selected` | `boolean` | `false` | 選択状態。単独使用時に設定 |
| `disabled` | `boolean` | `false` | 無効状態。クリック不可になる |
| `feedbackState` | `'default' \| 'correct' \| 'wrong' \| 'actual'` | `'default'` | フィードバック状態。Quiz等での正解/不正解表示に使用 |

**Events**:
- `radioSelect: EventEmitter<T>` - 選択されたときに発火

### pt-radio-group Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `''` | フォームの name 属性 |
| `value` | `T` | `null` | 現在選択中の値 |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | 配置方向 |
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | 間隔 |
| `disabled` | `boolean` | `false` | グループ全体の無効化 |

**Events**:
- `valueChange: EventEmitter<T>` - 選択が変わったときに発火

### Feedback States

| State | 用途 | 視覚表現 |
|-------|------|----------|
| `default` | 未回答・通常状態 | 標準スタイル |
| `correct` | 正解（選択した選択肢） | 緑背景 |
| `wrong` | 不正解（選択した選択肢） | 赤背景 |
| `actual` | 正解表示（選択しなかった正解） | 緑枠 + リング |

---

## Accessibility

- `role="radio"` / `role="radiogroup"` を自動付与
- `aria-checked` で選択状態を表現
- `aria-disabled` で無効状態を表現
- キーボード操作: `Tab` でフォーカス、`Space`/`Enter` で選択
- フォーカスリング表示（`:focus-visible`）

---

## Examples

### Basic Usage (Quiz)

```html
<pt-grid [columns]="2" [smColumns]="3" gap="md">
  <pt-radio-button
    *ngFor="let choice of choices"
    [value]="choice"
    [selected]="selectedChoice() === choice"
    [feedbackState]="getChoiceFeedbackState(choice)"
    [disabled]="isChecked()"
    (radioSelect)="selectChoice(choice)"
  >
    <pt-text variant="body-lg" weight="bold">{{ choice }}</pt-text>
    <pt-text variant="label-xs" color="secondary">倍</pt-text>
  </pt-radio-button>
</pt-grid>
```

### Form Usage with pt-radio-group

```html
<pt-radio-group 
  name="difficulty" 
  [(value)]="selectedDifficulty" 
  layout="horizontal"
>
  <pt-radio-button [value]="'easy'">かんたん</pt-radio-button>
  <pt-radio-button [value]="'normal'">ふつう</pt-radio-button>
  <pt-radio-button [value]="'hard'">むずかしい</pt-radio-button>
</pt-radio-group>
```

---

## Design Patterns

### Quiz Feedback Pattern

```typescript
getChoiceFeedbackState(choice: number): RadioButtonFeedbackState {
  if (!this.isChecked()) {
    return 'default';
  }

  const isSelected = this.selectedChoice() === choice;
  const isActual = this.actualEffectiveness() === choice;

  if (isSelected && isActual) return 'correct';
  if (isSelected && !isActual) return 'wrong';
  if (isActual) return 'actual';
  
  return 'default';
}
```

---

## Related Components

- `pt-grid`: 選択肢のグリッドレイアウトに使用
- `pt-text`: 選択肢内のテキスト表示に使用
- `pt-button`: アクション用ボタン（RadioButtonとは責務が異なる）

---

## References

- [SmartHR RadioButton](https://smarthr.design/products/components/radio-button/)
- [SmartHR RadioButtonPanel](https://smarthr.design/products/components/radio-button-panel/)
- [GitHub Primer SegmentedControl](https://primer.style/components/segmented-control)
- [Material Design 3 Segmented Button](https://m3.material.io/components/segmented-buttons/overview)
- [Design Token](../../design-tokens/tier3-component/radio-button.json)
