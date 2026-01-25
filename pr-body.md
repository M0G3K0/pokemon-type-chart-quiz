## 💡 概要
コード品質を事前に担保するためのガードレールを追加しました。

## 📝 変更内容
- ESLint `max-lines` ルールを追加（300行制限）
- commitlint をインストール・設定（Conventional Commits 形式を強制）
- husky `commit-msg` フックを追加
- AGENTS.md に言語ルールを明記（タイトル・コミットメッセージは英語）
- Issue/PR テンプレートにルール注記を追加（絵文字は任意化）
- 未使用 import と `any` 型を修正（ESLint エラー解消）

## 🔗 関連Issue
Closes #31

## ✅ チェックリスト
- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項
- ESLint ルールは `eslint.config.mjs`（Flat Config）で定義
- テストファイル、design-system、domain、features ディレクトリはマジックナンバールールを緩和
- commitlint は Conventional Commits 形式を検証（`type: description`）
