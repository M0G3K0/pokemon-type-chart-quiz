<!-- 🛡️ GUARDRAIL -->

# 行動計測の徹底（価値の憲法）

## @what / @why / @failure

```
@what  インタラクティブ要素（ボタン、リンク）へのトラッキングID付与を検査
@why   「計測できない機能は改善できない」ため。ユーザー行動データを確実に取得する基盤を守る
@failure  トラッキング不足が見つかった場合、CIが失敗する
```

---

## ルール一覧

### 1. トラッキングIDの必須化

ユーザーが操作する要素には `data-track-name` 属性（または相当するもの）を付与しなければならない。

- `button` 要素
- `a` 要素（外部リンクや重要リンク）

**形式**: `data-track-name="action-name"` または `[attr.data-track-name]="variable"`

---

## 例外と理由

### 1. 装飾的なリンク

- **対象**: ヘッダーロゴなど、計測価値の低いもの（要審議）
- **緩和**: 現状は警告のみとする場合もある。

---

## 実装

### ルールファイル（カスタムスクリプト）

**ソースオブトゥルース**: [`analytics.rules.js`](../rules/analytics.rules.js)

### 使用方法

```bash
npm run lint:value
```

---

## 違反時の対応

1. エラーログで対象ファイルを確認
2. 適切なトラッキング名をつけて属性を追加する
   - `<button data-track-name="submit-form">...</button>`

---

## 関連

- [Guards README](../../README.md)
