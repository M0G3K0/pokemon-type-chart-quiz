<!-- 🛡️ GUARDRAIL -->

# コーディング規約（コード品質の憲法）

## @what / @why / @failure

```
@what  コード品質に関する具体的な規約（マジックナンバー、未使用変数など）を検査
@why   コードの曖昧さを排除し、可読性と保守性を高めるため
@failure  Lintエラーとなり、CIが失敗する
```

---

## ルール一覧

### 1. マジックナンバー禁止 (no-magic-numbers)

コード中に意味不明な数値を直接書くことを禁止する。

```typescript
// ❌ Bad
setTimeout(() => {}, 86400000);

// ✅ Good
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
setTimeout(() => {}, MILLISECONDS_PER_DAY);
```

**許容値**: `0`, `1`, `-1`
**理由**: これらはループのインデックスや配列アクセス、フラグなどで頻繁に使用される明白な値であり、名前をつけると逆に可読性が下がるため。

### 2. 未使用変数の禁止 (no-unused-vars)

宣言のみで参照されていない変数や引数を禁止する。
意図的に使用しない変数は `_` で始めることで許容される。

```typescript
// ❌ Bad
const unused = 10;

// ✅ Good (意図的に無視)
const [_first, second] = array;
```

### 3. console.log 禁止 (no-console)

本番コードに `console.log` を残すことを禁止する（Warning）。
`console.error`, `console.warn` は許可される。

### 4. 明示的な型指定 (explicit-function-return-type 等)

関数の戻り値や引数に明示的な型指定を推奨する。
TypeScriptの推論機能は強力だが、境界（関数シグネチャ）は契約として明示すべき。

---

## 例外と理由

以下のパターンでは、ルールの一部を意図的に緩和している。

### 1. テストファイルでのマジックナンバー

- **対象**: `**/*.spec.ts`
- **緩和ルール**: `no-magic-numbers`
- **理由**: テストコードでは「具体的な値（期待値）」を明示することが重要であり、定数化するとテストの正当性が定数定義に依存してしまうため。

### 2. デザイン定義ファイルでのマジックナンバー

- **対象**: `src/styles/**`
- **緩和ルール**: `no-magic-numbers`
- **理由**: デザイントークン（フォントサイズ、スペーシング等）を定義する場所であり、ここには生の値が必要なため。

---


## 実装

### ルールファイル

**ソースオブトゥルース**: [`coding-standards.rules.js`](../rules/coding-standards.rules.js)

### 使用方法

```bash
npm run lint
```

### 設定ファイル

`eslint.config.js` がルールファイルをimportして使用。

---

## 違反時の対応

1. `npm run lint` でエラーを確認
2. エラー内容に従ってコードを修正
3. どうしても必要な場合は `// eslint-disable-next-line rule-name` で局所的に無効化する（ただし、理由をコメントに書くこと）

---

## 関連

- [Guards README](../../README.md)
