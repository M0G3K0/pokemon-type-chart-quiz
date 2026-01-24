<!-- 🛡️ GUARDRAIL -->

# デザインの一貫性（デザインの憲法）

## @what / @why / @failure

```
@what  CSS/SCSSの品質とデザインの一貫性を検査
@why   デザインの崩壊を防ぎ、保守性の高いスタイル定義を維持するため
@failure  Stylelintエラーとなり、CIが失敗する
```

---

## ルール一覧

### 1. !important の禁止 (declaration-no-important)

`!important` の使用を禁止する。

**理由**: 詳細度競争を引き起こし、スタイルの上書きが困難になる。CSS設計崩壊の最大の原因。

### 2. IDセレクタの禁止 (selector-max-id)

CSSでのIDセレクタ（`#header` など）の使用を禁止する。

**理由**: 詳細度が高すぎるため、再利用性が低く、上書きも困難になる。クラスセレクタを使用すること。
HTMLにはIDを使って良い（テストやJS用）が、CSSのスタイリングには使わない。

### 3. ネストの深さ制限 (max-nesting-depth)

ネストの深さを3階層までに制限する。

**理由**: 深すぎるネストはセレクタの詳細度を高め、HTML構造への依存度を上げてしまう。

### 4. 未知のプロパティ禁止 (property-no-unknown)

存在しないCSSプロパティの使用を禁止する。

**理由**: タイポによるバグを防ぐ。

### 5. ハードコードされた色の禁止 (color-no-hex, color-named)

Hexコード（`#ff0000`）や名前付きカラー（`red`）の使用を禁止する。
必ずデザインシステムで定義された変数（`$var`, `var(--var)`）を使用すること。

**理由**: デザインシステムの一貫性を強制し、勝手な色追加を防ぐため。

---

## 例外と理由

以下のパターンでは、ルールの一部を意図的に緩和している。

### 1. デザイン定義ファイルでの色・数値の使用

- **対象**: `src/styles/tokens/**/*.scss`, `src/design-system/**/*.scss`
- **緩和ルール**: `color-no-hex`, `color-named`
- **理由**: ここは「値を定義する場所」であり、変数の参照先となる生の値が必要なため。自己参照（無限ループ）を防ぐために必須。

### 2. Angular固有の擬似要素

- **対象**: 全体
- **緩和ルール**: `selector-pseudo-element-no-unknown` (for `::ng-deep`)
- **理由**: AngularのViewEncapsulationを回避するために `::ng-deep` が必要になるケースがある（ただし使用は最小限にすること）。

---


## 実装

### ルールファイル

**ソースオブトゥルース**: [`design-consistency.rules.js`](../rules/design-consistency.rules.js)

### 使用方法

```bash
npm run lint:style
```

### 設定ファイル

`.stylelintrc.js` がルールファイルをimportして使用。

---

## 違反時の対応

1. `npm run lint:style` でエラーを確認
2. スタイル定義を修正（クラス名の見直し、ネストの解消など）

---

## 関連

- [Guards README](../../README.md)
