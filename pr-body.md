## 💡 概要

pt-chip / pt-type-chip のUI改善と、SV/ZA（スカーレット・バイオレット）風のタイプアイコン・カラーへの更新を行う。

## 📝 変更内容

### 🎨 SVGアイコン
- Pokemon GO風からSV/ZA風のアイコンに全18タイプを更新
- 背景円を削除し、白抜きアイコンのみに変更
- ソース: partywhale/pokemon-type-icons (MIT License)

### 🎨 デザイントークン
- 全18タイプのカラーを公式SV/ZAカラーパレットに更新
- 500レベル（基準色）を変更

### 🔧 pt-chip / pt-icon 改善
- `:host`スタイルでラッパーサイズを適正化
- padding調整（sm=4px, md=4px, lg=4px）
- アイコンサイズ調整（sm=20px, md=32px, lg=48px）
- テキストのline-heightを修正してテキスト高さを正常化
- セマンティックトークン名を修正（border-radius）

### ♻️ Quiz画面リファクタ
- pt-type-icon → pt-type-chip に置き換え
- app-type-badge → pt-type-chip に置き換え
- 不要なクラス（mb-2）を削除

## 🔗 関連Issue

Closes #47

## 📷 スクリーンショット（該当する場合）

攻撃側タイプとポケモンタイプ表示がSV風のアイコン・カラーになりました。

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

### 今後の課題（Issueとして別途登録済み）
- #54: コンポーネント構成ファイル完全性チェック
- #55: CSSトークン存在確認
- #56: トークン使用の検証
- #57: 共通スタイルの保守性
- #58: コンポーネント作成のガードレール
- #59: NgDoc導入

## 📝 PRタイトルの命名規則:

`feat: improve pt-chip styling and update to SV/ZA icons`

## 📖 レビュー用語集

| 用語 | 意味 | 説明 |
|------|------|------|
| **LGTM** | Looks Good To Me | 良いと思います |
