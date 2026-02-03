<!-- 🛡️ GUARDRAIL -->

# コンポーネントSCSS：Tier3トークン専用ルール

## @what / @why / @failure

```
@what  UIコンポーネントのSCSSがTier3（コンポーネント）トークンのみを参照することを強制
@why   AIが新しいコンポーネントやバリエーションを作成する際のルールを明確にし、保守性を向上させるため
@failure  Stylelintエラーとなり、CIが失敗する
```

---

## 背景

デザイントークンの3層アーキテクチャ:

| 層 | 役割 | 例 |
|----|------|-----|
| **Tier 1 (Primitive)** | 生の値 | `--pt-color-gray-800`, `--pt-space-4` |
| **Tier 2 (Semantic)** | 意味論的トークン | `--pt-color-text-primary`, `--pt-typography-body-md-*` |
| **Tier 3 (Component)** | コンポーネント専用 | `--pt-button-primary-bg-default`, `--pt-heading-font-xl-*` |

**ルール**: コンポーネントSCSSは**Tier3のみ**を参照する。

---

## ルール一覧

### 1. 対象ファイル

`src/app/ui/**/*.scss` （コンポーネントSCSS）

### 2. 禁止パターン

Tier2セマンティックトークンの直接参照を禁止:

- `--pt-typography-*` → 代わりに `--pt-{component}-font-*` を使用
- `--pt-color-surface-*` → Tier3で定義してから参照
- `--pt-color-text-*` → Tier3で定義してから参照
- `--pt-spacing-content-*` → Tier3で定義してから参照

### 3. 許可パターン

Tier3コンポーネントトークン:

- `--pt-button-*`
- `--pt-card-*`
- `--pt-heading-*`
- `--pt-text-*`
- `--pt-avatar-*`
- `--pt-chip-*`
- `--pt-spinner-*`
- `--pt-icon-*`
- `--pt-badge-*`
- `--pt-radio-button-*`
- `--pt-surface-*`
- `--pt-grid-*`
- `--pt-stack-*`
- `--pt-type-chip-*`

---

## 例外

### 1. グローバルスタイル・mixins

- **対象**: `src/styles/**/*.scss`
- **理由**: レイアウトやミックスインはTier2を参照する場合がある

### 2. NgDoc デモコンポーネント

- **対象**: `projects/docs/**/*.ts` 内の styles
- **理由**: デモ目的でTier1/2を直接使う場合がある

---

## 実装

### ルールファイル

**ソースオブトゥルース**: [`tier3-only.rules.js`](../rules/tier3-only.rules.js)

### 使用方法

```bash
npm run lint:css
```

### 設定ファイル

`.stylelintrc.js` がルールファイルをimportして使用。

---

## 違反時の対応

1. `npm run lint:css` でエラーを確認
2. コンポーネントのTier3 JSONにトークンを追加
3. `npm run tokens:build` でトークンを生成
4. SCSSをTier3トークン参照に更新

### 例

```scss
// ❌ Bad: Tier2トークン直接使用
.pt-heading--xl {
  font-family: var(--pt-typography-heading-xl-font-family);
}

// ✅ Good: Tier3トークン経由
.pt-heading--xl {
  font-family: var(--pt-heading-font-xl-font-family);
}
```

### トークンエイリアスの追加方法

```json
// design-tokens/tier3-component/heading.json
{
  "heading": {
    "font": {
      "xl": {
        "fontFamily": { "value": "{typography.heading.xl.fontFamily}" }
      }
    }
  }
}
```

---

## 関連

- [Guards README](../../README.md)
- [Token Naming](../guard/token-naming.guard.md)
- [トークン戦略ドキュメント](../../../docs/decisions/token-strategy.md)
