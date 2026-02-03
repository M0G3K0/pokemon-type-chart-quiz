<!-- 🛡️ GUARDRAIL -->

# Angular Control Flow Syntax / Angular 制御フロー構文

## @what / @why / @failure

```
@what  Angular 17+ の新しい制御フロー構文 (@if, @for, @switch) を強制する
@why   従来の *ngIf, *ngFor, *ngSwitch は非推奨であり、新構文はパフォーマンスと可読性が向上
@failure  非推奨構文を許可すると、将来の Angular バージョンアップで破壊的変更の影響を受ける
```

---

## ルール一覧

### Rule 1: @if を使用する

```html
<!-- ❌ 禁止 -->
<div *ngIf="condition">...</div>
<div *ngIf="condition; else elseBlock">...</div>

<!-- ✅ 正解 -->
@if (condition) {
  <div>...</div>
} @else {
  <div>...</div>
}
```

### Rule 2: @for を使用する

```html
<!-- ❌ 禁止 -->
<div *ngFor="let item of items; trackBy: trackByFn">...</div>

<!-- ✅ 正解 -->
@for (item of items; track item.id) {
  <div>...</div>
} @empty {
  <div>No items</div>
}
```

### Rule 3: @switch を使用する

```html
<!-- ❌ 禁止 -->
<div [ngSwitch]="value">
  <span *ngSwitchCase="1">One</span>
  <span *ngSwitchDefault>Other</span>
</div>

<!-- ✅ 正解 -->
@switch (value) {
  @case (1) { <span>One</span> }
  @default { <span>Other</span> }
}
```

---

## 実装

- **ESLint ルール**: `guards/code-quality/rules/angular-control-flow.rules.js`
- **設定ファイル**: `eslint.config.mjs`
- **Angular ESLint**: `@angular-eslint/template/prefer-control-flow`

---

## 違反時の対応

1. 非推奨構文を新構文に変換
2. `npm run lint` でエラーが解消されたことを確認

---

## 参照

- [Angular Built-in Control Flow](https://angular.dev/guide/templates/control-flow)
- [Angular ESLint prefer-control-flow](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-control-flow.md)
