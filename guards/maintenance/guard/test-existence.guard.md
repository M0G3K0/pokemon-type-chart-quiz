<!-- 🛡️ GUARDRAIL -->

# テストファイルの存在（保守の憲法）

## @what / @why / @failure

```
@what  主要なコード（コンポーネント、サービス）に対するテストファイルの存在を検査
@why   機能追加時にテストが書かれていない状態を防ぎ、品質を維持するため
@failure  テストファイルが欠落している場合、CIが失敗する
```

---

## ルール一覧

### 1. Angularコンポーネントのテスト必須

`*.component.ts` には同階層に `*.component.spec.ts` が必要。

### 2. Angularサービスのテスト必須

`*.service.ts` には同階層に `*.service.spec.ts` が必要。

---

## 例外と理由

### 1. ルートファイルの一部

- **対象**: `app.component.ts` は対象だが、設定ファイル的な役割のものは除外可能（現状は除外なし）。

---

## 実装

### ルールファイル（カスタムスクリプト）

**ソースオブトゥルース**: [`test-existence.rules.js`](../rules/test-existence.rules.js)

### 使用方法

```bash
npm run lint:test-existence
```

---

## 違反時の対応

1. エラーログで欠落ファイルを確認
2. `ng generate` コマンド等でテストファイルを作成する
   - 例: `ng g c feature-name` なら自動生成されるので問題ないが、手動作成時は忘れがち。

---

## 関連

- [Guards README](../../README.md)
