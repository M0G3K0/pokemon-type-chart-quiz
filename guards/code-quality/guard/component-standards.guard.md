<!-- 🛡️ GUARDRAIL -->

# コンポーネント作成標準の統合ガードレール

## @what / @why / @failure

```
@what  pt-*コンポーネントが作成標準（ファイル構成、ドキュメント、テスト）を満たしているか検査
@why   コンポーネント品質の一貫性を担保し、新規作成時の抜け漏れを防ぐため
@failure  標準を満たさないコンポーネントはCIでエラーとなる
```

---

## ルール一覧

### 1. ファイル構成の完全性

**参照**: [component-structure.guard.md](./component-structure.guard.md)

| ファイル | 必須 | 説明 |
|----------|:----:|------|
| `pt-{name}.ts` | ✅ | Componentクラス |
| `pt-{name}.spec.ts` | ✅ | テストファイル |

### 2. ドキュメントの存在

すべての `pt-*` コンポーネントには対応するドキュメントが必要：

```
docs/components/pt-{name}.md
```

**理由**: コンポーネントの使い方、プロパティ、アンチパターンを記録し、再利用性を高める。

### 3. テストの最低要件

`pt-{name}.spec.ts` には最低1つの `it()` または `test()` ブロックが必要。

```typescript
// ✅ Good
it('should create', () => {
  expect(component).toBeTruthy();
});

// ❌ Bad (空のspecファイル)
describe('PtChip', () => {
  // no test cases
});
```

### 4. Design Token使用強制

**参照**: [token-existence.guard.md](../../design/guard/token-existence.guard.md)

SCSSファイル内の `--pt-*` 変数はすべて定義済みであること。

---

## 実装

### ルールファイル

**ソースオブトゥルース**: [`component-standards.rules.js`](../rules/component-standards.rules.js)

### 使用方法

```bash
npm run guard:component-standards
```

### 関連スクリプト

| スクリプト | 検査内容 |
|-----------|---------|
| `guard:component-structure` | ファイル完全性 |
| `guard:token-existence` | トークン存在 |
| `guard:component-standards` | 統合検査（上記 + ドキュメント + テスト内容） |

---

## 違反時の対応

### ドキュメント不足

1. `docs/components/pt-{name}.md` を作成
2. `/component-doc` ワークフローを参照

### テスト不足

1. `pt-{name}.spec.ts` に最低1つのテストケースを追加
2. `ng generate component` のテンプレートを参考に

---

## 関連Issue

- [#54: component-structure guardrail](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/54)
- [#55: token-existence guardrail](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/55)
- [#58: component creation standards](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/58)

---

## 関連

- [Guards README](../../README.md)
- [Component Creation Workflow](../../../.agent/workflows/component.md)
