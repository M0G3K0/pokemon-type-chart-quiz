## 💡 概要

`guards/design/rules/design-consistency.rules.js` で定義したStylelintルールが、実際の `.stylelintrc.js` に統合されておらず、ガードレールが機能していない問題を修正する。

## 📝 詳細

### 現状の問題

1. **ルール定義あり、統合なし**
   - `design-consistency.rules.js` には `!important` 禁止、色ハードコード禁止などのルールが定義済み
   - しかし `.stylelintrc.js` はこのファイルを参照しておらず、ルールが適用されていない

2. **実際に違反が検出されない**
   - `src/styles.scss` に `#3b82f6` などのハードコード色が存在
   - `npm run lint:css` を実行しても違反が検出されない

### 期待される動作

- `.stylelintrc.js` が `design-consistency.rules.js` をインポートして使用
- SCSSファイルでのハードコード色がエラーとして検出される
- ただしトークン定義ファイル（`src/styles.scss` の `@theme` ブロック等）は例外として許可

## ✅ やることリスト

- [ ] `.stylelintrc.js` を修正して `design-consistency.rules.js` を統合
- [ ] トークン定義ファイルの例外設定（`overrides`）を追加
- [ ] `npm run lint:css` で違反が正しく検出されることを確認
- [ ] CIで検証が走ることを確認

## 📷 参考資料（任意）

| 参照 | 説明 |
|------|------|
| `guards/design/rules/design-consistency.rules.js` | 統合すべきルールファイル |
| `guards/design/guard/design-consistency.guard.md` | ガードレールドキュメント |
| #9 | 関連Issue（ガードレール設定の整備） |
