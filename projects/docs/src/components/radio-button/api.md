---
title: API
route: api
---

## Playground

{{ NgDocActions.playground("RadioButtonPlayground") }}

---

## API Reference

{{ NgDocApi.api("src/app/ui/pt-radio-button/pt-radio-button.ts#PtRadioButtonComponent") }}

---

## Details

{{ NgDocApi.details("src/app/ui/pt-radio-button/pt-radio-button.ts#PtRadioButtonComponent") }}

---

## Type Definitions

```typescript
type RadioButtonFeedbackState = 'default' | 'correct' | 'wrong' | 'actual';
```

---

## Quiz Feedback Pattern

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

## Related

- `pt-grid`: 選択肢のグリッドレイアウトに使用
- `pt-text`: 選択肢内のテキスト表示に使用
