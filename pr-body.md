## 💡 概要

GitHub CLI（`gh`）を使ったIssue/PR作成時の絵文字文字化け問題を解決。

`execSync` でシェル経由だと文字化けしていたのを、`spawnSync` でシェルを経由しないようにすることで解決。

## 📝 変更内容

### ワークフロー更新
- `.agent/workflows/issue.md`: `execSync` → `spawnSync` に変更
- `.agent/workflows/pr.md`: `execSync` → `spawnSync` に変更

### 技術的な違い

| 方式 | 問題 |
|------|------|
| `execSync` + テンプレートリテラル | シェル経由で文字化け |
| `spawnSync` + 配列引数 | シェル非経由で正常 |

## 🔗 関連Issue

N/A

## 📷 スクリーンショット（該当する場合）

テスト結果（Issue #130で確認済み、削除済み）:
- `spawnSync` 使用時: ✅ `🔧 chore: test emoji with spawnSync`

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

Windows環境でのGitHub CLI + 絵文字の問題を根本的に解決するための変更です。

--- 

## 📝 PRタイトルの命名規則:
- `type: description` の形式にすること（Conventional Commits）
- **英語で書くこと**（commitlint で検証されます）

タイプ一覧（絵文字は任意）:
- ✨ feat: 新機能
- 🩹 fix: バグ修正
- 🐛 bug: バグ報告（Issue用）
- 📚 docs: ドキュメント
- 🎨 style: スタイル変更
- ♻️ refactor: リファクタリング
- ⚡ perf: パフォーマンス改善
- 🧪 test: テスト
- 🏗️ build: ビルド
- 👷 ci: CI/CD
- 🔧 chore: その他
- ❓ question: 質問・議論（Issue用）
- ⏪ revert: 変更を元に戻す
- 💥 breaking: 破壊的変更
- 🚧 wip: 作業中

例: `feat: add sound effects and toggle switch`

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
