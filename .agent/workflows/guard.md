---
description: ガードレール（guard + rules）を新規作成する手順
---

# ガードレール作成ワークフロー

このワークフローは `/guard` コマンドで呼び出されます。

## 🚨 重要なルール

- **`.guard.md` と `.rules.js` は必ずペアで作成**
- **メタガードレール（`guardrail-format.guard.md`）に準拠すること**
- **guards/README.md のディレクトリ構成を更新すること**

---

## Step 1: カテゴリを決定

既存カテゴリから選択、または新規作成：

| カテゴリ | 目的 |
|----------|------|
| `architecture` | 依存の向き、責務の境界 |
| `code-quality` | コーディング規約 |
| `design` | デザインシステム準拠 |
| `maintenance` | デッドコード、重複、テスト存在 |
| `meta` | ガードレール自体のルール |
| `process` | PR/Issue/コミット規約 |
| `ux` | UX品質 |
| `value` | ビジネス価値追跡 |
| `velocity` | パフォーマンス |

---

## Step 2: ガードレールドキュメント作成

`guards/{category}/guard/{name}.guard.md` を作成：

```markdown
<!-- 🛡️ GUARDRAIL -->

# ガードレール名

## @what / @why / @failure

（必須セクション）

## ルール一覧

（ルールの説明）

## 実装

（ルールファイルへの参照）

## 違反時の対応

（修正手順）
```

---

## Step 3: ルールファイル作成

`guards/{category}/rules/{name}.rules.js` を作成：

### 🚨 必須要件: エラーメッセージにガードレール参照を含める

違反時のエラーメッセージには**必ずガードレールドキュメントへのパス**を含めること。
これにより、違反者がどこを参照すべきか一目でわかる。

```javascript
/**
 * @what  何を検査するか
 * @why   なぜこの検査が必要か
 * @failure  違反時にどうなるか
 * @guardrail guards/{category}/guard/{name}.guard.md
 */

// ガードレールドキュメントへのパス（エラーメッセージ用）
const GUARDRAIL_PATH = 'guards/{category}/guard/{name}.guard.md';

// ESLint/Stylelint/dependency-cruiser等の設定をexport
module.exports = {
  // ルール定義
  // エラーメッセージにGUARDRAIL_PATHを含める
  // 例: message: `ルール違反です (${GUARDRAIL_PATH})`
};
```

### エラーメッセージ例

```
❌ Primitiveトークン禁止。Semantic/Componentを使用 (guards/design/guard/token-naming.guard.md)
```

---

## Step 4: 設定ファイルに統合

ルールの種類に応じて適切な設定ファイルに統合：

| ルール種類 | 設定ファイル |
|-----------|-------------|
| Stylelint | `.stylelintrc.js` |
| ESLint | `eslint.config.js` |
| dependency-cruiser | `.dependency-cruiser.js` |
| カスタムスクリプト | `package.json` の `scripts` |

---

## Step 5: guards/README.md を更新

ディレクトリ構成セクションに新しいガードレールを追加。

---

## Step 6: 検証

// turbo
```bash
npm run guards:validate
```

新しいガードレールが検証に通ることを確認。

---

## 参照

| 内容 | ファイル |
|------|----------|
| **メタガードレール（必読）** | `guards/meta/guard/guardrail-format.guard.md` |
| ガードレール一覧 | `guards/README.md` |
| ルールヘルパー | `guards/utils/rule-helper.js` |
