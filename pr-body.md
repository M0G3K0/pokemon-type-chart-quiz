## 💡 概要
NgDocドキュメントサイトのバンドルサイズbudget制限を緩和し、CIビルドが通るようにする。

## 📝 変更内容
- **angular.json**: docs プロジェクトのbudgetを緩和
  - Initial JS: 500kB/1MB → 2MB/5MB
- **performance.guard.md**: NgDoc用の別基準を明文化
  - メインアプリとドキュメントサイトの基準を分離

## 🔗 関連Issue
<!-- 該当なし -->

## 📷 スクリーンショット（該当する場合）
該当なし（設定変更のみ）

## ✅ チェックリスト
- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項
NgDocはmermaid等の重いライブラリを含むため、メインアプリより大きなバンドルサイズになります。

現在のバンドルサイズ: **1.63 MB**（緩和後の上限 5MB 以内）

ドキュメントサイトはユーザー向けプロダクションアプリではなく開発者向けのため、パフォーマンス基準を緩和しても問題ありません。

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
