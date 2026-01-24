<!-- 🛡️ GUARDRAIL -->

# ガードレール書式ルール（メタ憲法）

## @what / @why / @failure

```
@what  ガードレールファイルとルールファイルの書式を検査
@why   一貫性のある書式により、AIと人間がルールを素早く理解できるようにするため
@failure  書式が不正なガードレールはCIでエラーとなる
```

---

## ガードレールドキュメント（*.guard.md）

すべてのガードレールファイルは以下の構造を持つこと：

### 1. 識別バッジ（1行目）

```html
<!-- 🛡️ GUARDRAIL -->
```

### 2. タイトル

```markdown
# ガードレール名
```

### 3. @what / @why / @failure セクション

```markdown
## @what / @why / @failure

（コードブロック内に3つのアノテーションを記載）
```

### 4. 実装セクション

```markdown
## 実装

- ルールファイルへの参照
- 使用方法（npm scriptなど）
```

### 5. 違反時の対応セクション

```markdown
## 違反時の対応

1. エラーメッセージの確認方法
2. 修正手順
```

---

## ルールファイル（*.rules.js）

すべてのルールファイルは以下の構造を持つこと：

### 1. JSDocヘッダー

```javascript
/**
 * @what  何を検査するか
 * @why   なぜこの検査が必要か
 * @failure  違反時にどうなるか
 */
```

### 2. withGuardrailヘルパーの使用（必須）

```javascript
const { withGuardrail } = require("../../utils/rule-helper");

module.exports = withGuardrail("guards/xxx/guard/xxx.guard.md", [
  // ルール定義
]);
```

**理由**: ガードレール参照が自動的にエラーメッセージに含まれるようにするため。

---

## エラーメッセージ要件

違反時のエラーメッセージには以下が含まれること：

1. **違反ファイルパス**: どのファイルが違反しているか
2. **ルール名**: どのルールに違反しているか
3. **ガードレール参照**: 対応する `.guard.md` ファイルパス

`withGuardrail` ヘルパーを使用すれば、3は自動的に満たされる。

---

## 検証方法

```bash
npm run guards:validate
```

---

## 関連

- [Guards README](../../README.md)
- [ルールヘルパー](../../utils/rule-helper.js)

