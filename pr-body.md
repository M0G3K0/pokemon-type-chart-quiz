## 💡 概要

Spinnerコンポーネントをイチョウ型からドーナツ状に改善。
トラック色トークンを追加し、背景リングが見える形状に変更。

## 📝 変更内容

### Spinnerスタイル改善
- **形状変更**: イチョウ型（1/4アーク）→ドーナツ状（フルリング）
- **トラック色追加**: 背景リングとして薄いグレーを表示

### トークン追加
- `--pt-spinner-color-track`: トラック色（rgba(0, 0, 0, 0.1)）

### 変更ファイル
- `design-tokens/tier3-component/spinner.json`: トラック色トークン追加
- `src/app/ui/pt-spinner/pt-spinner.scss`: ドーナツ状スタイルに変更

## 🔗 関連Issue

- Partially addresses #108 (comprehensive UI component quality review)

## 📷 スクリーンショット（該当する場合）

N/A（ドキュメントビルドで確認可能）

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

Icon表示問題は、以前のPR（fix: use AssetPathService）で対応済みの可能性が高い。

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
