## 💡 概要

Vercelデプロイメントのセットアップと依存関係の競合を解決しました。

## 📝 変更内容

- Vercelプロジェクトの作成とGitHubリポジトリ接続
- `eslint-plugin-tailwindcss` を削除（Tailwind v4非対応のため）
- Node.jsエンジンバージョンを `>=22.0.0` に設定
- READMEにデプロイURLとバッジを追加
- `.gitignore` に `.vercel` ディレクトリを追加

## 🔗 関連Issue

Closes #7

## 📷 スクリーンショット（該当する場合）

N/A - インフラ変更のみ

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

- Vercel Production URL: https://pokemon-type-chart-quiz.vercel.app
- `eslint-plugin-tailwindcss` はTailwind v4対応版がリリースされたら再追加予定

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

| 用語 | 意味 | 説明 |
|------|------|------|
| **LGTM** | Looks Good To Me | 良いと思います |
| **WIP** | Work In Progress | 対応中 |
| **FYI** | For Your Information | 参考までに |
| **must** | must | 必須 |
| **want** | want | できれば |
| **imo** | in my opinion | 私の意見では |
| **nits** | nitpick | 些細な指摘（重箱の隅をつつくの意味） |
