<!-- 🛡️ GUARDRAIL -->

# トークン命名規則（デザインシステムの憲法）

## @what / @why / @failure

```
@what  コンポーネントSCSSでTier 3トークンのみの使用を強制
@why   Tier 1/2の直接使用を防ぎ、NgDocドキュメントの自動生成とデザインシステムの一貫性を維持するため
@failure  Stylelintエラーとなり、CIが失敗する
```

---

## ルール一覧

### 1. コンポーネントSCSSではTier 3トークンのみ使用可能

コンポーネントのSCSS（`src/app/ui/` 配下）では、自身のコンポーネントトークン（Tier 3）のみを使用する。
Tier 1（Primitive）および Tier 2（Semantic）の直接使用は禁止。

**許可されるトークン（Tier 3 のみ）:**
- `--pt-chip-*` (Component)
- `--pt-button-*` (Component)
- `--pt-card-*` (Component)
- `--pt-icon-*` (Component)
- `--pt-text-*` (Component)
- `--pt-spinner-*` (Component)
- その他 `--pt-{component}-*` パターン

**禁止されるトークン（Tier 1 - Primitive）:**
- `--pt-color-gray-*`
- `--pt-color-pokemon-*`
- `--pt-color-lime-*`
- `--pt-color-red-*`
- `--pt-color-white` / `--pt-color-black`
- `--pt-space-{number}` (例: `--pt-space-10`, `--pt-space-20`)

**禁止されるトークン（Tier 2 - Semantic）:**
- `--pt-spacing-*` (spacing.content / spacing.layout / spacing.gap)
- `--pt-font-*` (font.size / font.weight / font.family)
- `--pt-semantic-border-*` (semantic-border.radius / width)
- `--pt-motion-*` (motion.duration / motion.easing)
- `--pt-elevation-*`

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
2. Tier 1/2トークンを対応するTier 3コンポーネントトークンに置き換える
3. 必要なコンポーネントトークンが存在しない場合は、まず `design-tokens/tier3-component/{name}.json` にトークンを追加する
4. `npm run tokens:build` でCSS変数を再生成

### 例

```scss
// ❌ Bad: Primitiveトークン直接使用（Tier 1）
.my-component {
  color: var(--pt-color-gray-800);
  padding: var(--pt-space-20);
}

// ❌ Bad: Semanticトークン直接使用（Tier 2）
.my-component {
  padding: var(--pt-spacing-content-sm);
  font-size: var(--pt-font-size-md);
  border-radius: var(--pt-semantic-border-radius-md);
}

// ✅ Good: コンポーネントトークン経由（Tier 3）
.my-component {
  padding: var(--pt-button-padding-y-sm) var(--pt-button-padding-x-sm);
  font-size: var(--pt-button-font-size-sm);
  border-radius: var(--pt-button-radius);
}
```

---

## 関連

- [Guards README](../../README.md)
- [Design Consistency](../guard/design-consistency.guard.md)
- [Issue #18: Primitiveトークン直接使用排除](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/18)
