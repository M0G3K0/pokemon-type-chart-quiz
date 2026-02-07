<!-- 🛡️ GUARDRAIL -->

# トークン命名規則（デザインシステムの憲法）

## @what / @why / @failure

```
@what  デザイントークンの3層アーキテクチャに基づく使用規則を強制
@why   Primitiveトークンの直接使用を防ぎ、デザインシステムの一貫性と保守性を維持するため
@failure  Stylelintエラーとなり、CIが失敗する
```

---

## ルール一覧

### 1. Primitiveトークン直接使用の禁止

UI実装（SCSS/CSS）でPrimitiveトークン（Tier 1）を直接使用することを禁止する。

**許可されるトークン（Tier 2 / Tier 3）:**
- `--pt-color-surface-*` (Semantic)
- `--pt-color-text-*` (Semantic)
- `--pt-color-action-*` (Semantic)
- `--pt-color-border-*` (Semantic)
- `--pt-color-result-*` (Semantic)
- `--pt-card-*` (Component)
- `--pt-button-*` (Component)
- `--pt-badge-*` (Component)

**禁止されるトークン（Tier 1）:**
- `--pt-color-gray-*`
- `--pt-color-pokemon-*`
- `--pt-color-lime-*`
- `--pt-color-red-*`
- `--pt-color-white`
- `--pt-color-black`
- `--pt-space-{number}` (例: `--pt-space-10`, `--pt-space-20`)

### 2. トークン命名規則

トークン変数名は以下の形式に従うこと:

```
--pt-{category}-{property}-{concept}-{state}
```

例:
- `--pt-color-surface-card` (category: color, property: surface, concept: card)
- `--pt-spacing-content-md` (category: spacing, property: content, concept: md)
- `--pt-button-primary-bg-hover` (component: button, variant: primary, property: bg, state: hover)

---

## 例外と理由

### 1. トークン定義ファイル

- **対象**: `src/styles.scss`, `src/styles/**/*.scss`
- **緩和ルール**: `declaration-property-value-disallowed-list`
- **理由**: トークンを定義する場所であり、Primitive値の参照が必要なため

---

## 実装

### ルールファイル

**ソースオブトゥルース**: [`token-naming.rules.js`](../rules/token-naming.rules.js)

### 使用方法

```bash
npm run lint:css
```

### 設定ファイル

`.stylelintrc.js` がルールファイルをimportして使用。

---

## 違反時の対応

1. `npm run lint:css` でエラーを確認
2. Primitiveトークンを対応するSemantic/Componentトークンに置き換える
3. 必要なSemantic/Componentトークンが存在しない場合は、まずトークン定義を追加する

### 例

```scss
// ❌ Bad: Primitiveトークン直接使用
.my-component {
  background-color: var(--pt-color-gray-50);
  color: var(--pt-color-gray-800);
}

// ✅ Good: Semantic/Componentトークン経由
.my-component {
  background-color: var(--pt-color-surface-default);
  color: var(--pt-color-text-primary);
}
```

---

## 関連

- [Guards README](../../README.md)
- [Design Consistency](../guard/design-consistency.guard.md)
- [Issue #18: Primitiveトークン直接使用排除](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/18)
