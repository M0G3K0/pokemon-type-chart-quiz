<!-- 🛡️ GUARDRAIL -->

# コンポーネント-トークン対応 (component-token-mapping)

## @what / @why / @failure

```
@what  UIコンポーネントとTier 3トークンの対応関係を検証する
@why   コンポーネントにトークンがない、またはトークンにコンポーネントがない状態を防ぎ、デザインシステムの一貫性を保証する
@failure  対応関係に不整合がある場合、CIが失敗する
```

---

## ルール一覧

### RULE-01: コンポーネントには対応するトークンが必要

`src/app/ui/pt-*` にコンポーネントがある場合、
`design-tokens/tier3-component/{component-name}.json` に対応するトークン定義が必要。

**❌ 警告パターン:**

```
src/app/ui/pt-new-component/  ← 存在
design-tokens/tier3-component/new-component.json  ← 存在しない
```

**✅ 正しいパターン:**

```
src/app/ui/pt-new-component/  ← 存在
design-tokens/tier3-component/new-component.json  ← 存在
```

### RULE-02: トークンには対応するコンポーネントが必要

`design-tokens/tier3-component/*.json` にトークンがある場合、
`src/app/ui/pt-{token-name}` に対応するコンポーネントが必要。

**❌ 警告パターン:**

```
design-tokens/tier3-component/badge.json  ← 存在
src/app/ui/pt-badge/  ← 存在しない（孤立トークン）
```

---

## 除外リスト

以下のコンポーネント/トークンはチェック対象外：

| 種類 | 名前 | 理由 |
|------|------|------|
| コンポーネント | pt-type-chip | pt-chip のセマンティックラッパー（type-chip.json で対応） |

※ 除外リストはルールファイル内で定義

---

## 実装

- **検証ルール**: `guards/design/rules/component-token-mapping.rules.js`
- **実行**: `npm run guard:component-token-mapping`

---

## 違反時の対応

### コンポーネントにトークンがない場合

1. `design-tokens/tier3-component/{component-name}.json` を作成
2. コンポーネント固有のトークン（色、サイズ、スペーシング等）を定義
3. `npm run tokens:build` でトークンを再生成

### トークンにコンポーネントがない場合（孤立トークン）

1. トークンが本当に不要か確認
2. 不要なら `design-tokens/tier3-component/{token-name}.json` を削除
3. 必要ならコンポーネントを作成

---

## 参照

- [Issue #92](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/92): add guardrail for component-token mapping validation
