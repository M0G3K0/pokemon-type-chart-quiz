## 💡 概要
Issue作成時に、テンプレートの必須項目が揃っているかを自動でチェックし、不足があればIssueにコメントを投稿して修正を促すカスタムガードレールを実装しました。

## 📝 変更内容
- **ガードレールドキュメント**: `guards/process/guard/issue-format.guard.md` を追加
- **ルール定義**: `guards/process/rules/issue-format.rules.js` でテンプレート別の必須セクションを定義
- **バリデーションスクリプト**: `scripts/validate-issue-content.js` でIssue本文をチェック
- **GitHub Actions**: `.github/workflows/issue-validation.yml` でIssue作成・編集時に自動実行

## 🔗 関連Issue
N/A

## 📷 スクリーンショット（該当する場合）
N/A

## ✅ チェックリスト
- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項
今後、Issueを立てる際にテンプレートの必須項目が抜けていると、自動でコメントが投稿されて修正を促されます。PR同様、「書くべきことを書き忘れない」仕組みが整いました。

--- 

## 📝 PRタイトルの命名規則:
- [type]: [description]の形式にすること

タイプ一覧:
- ✨ feat: 新機能
- 🐛 fix: バグ修正
- 📚 docs: ドキュメント
- 🎨 style: スタイル変更
- ♻️ refactor: リファクタリング
- ⚡ perf: パフォーマンス改善
- 🧪 test: テスト
- 🏗️ build: ビルド
- 👷 ci: CI/CD
- 🔧 chore: その他

説明の書き方: 
- 英語で書くこと
- 1行で説明すること
- すべて小文字で書くこと

例: feat: add sound effects and toggle switch

## 📖 レビュー用語集
<!-- レビュー時によく使う用語の意味 -->

| 用語 | 意味 | 説明 |
|------|------|------|
| **LGTM** | Looks Good To Me | 良いと思います |
| **WIP** | Work In Progress | 対応中 |
| **FYI** | For Your Information | 参考までに |
| **must** | must | 必須 |
| **want** | want | できれば |
| **imo** | in my opinion | 私の意見では |
| **nits** | nitpick | 些細な指摘（重箱の隅をつつくの意味） |
