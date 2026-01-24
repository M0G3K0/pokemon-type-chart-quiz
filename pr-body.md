## 💡 概要
プロジェクトのデプロイ基盤、エディタ設定、およびGitHubでの開発プロセスを支える基盤（PRテンプレートとバリデーション）を構築しました。

## 📝 変更内容
- Vercelデプロイ設定 (`vercel.json`) の追加
- エディタ設定の統一 (`.editorconfig`)
- PRテンプレート (`.github/pull_request_template.md`) の導入
- PRのタイトルと本文を自動検証するカスタムガードレールの実装 (`scripts/validate-pr-content.js`)
- GitHub ActionsでのCI統合

## 🔗 関連Issue
Closes #0 (Initial Setup)

## 📷 スクリーンショット（該当する場合）
N/A (CUI/Infrastructure only)

## ✅ チェックリスト
- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した


## 📌 補足事項
今回導入したカスタムガードレールにより、今後作成されるPRの本文に特定のセクションが欠けている場合、CIが自動的に失敗するようになります。

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
