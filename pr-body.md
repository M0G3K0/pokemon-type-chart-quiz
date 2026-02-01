## 💡 概要

Phase 3e の実装として、Avatar と Heading コンポーネントの設計ガイドラインを作成し、トークン参照の整合性を修正しました。

## 📝 変更内容

- **avatar-heading-guide.md 新規作成**: Shape/Level/Size の使い分けガイドライン
- **heading.json トークン参照修正**: `color.gray.800` → `color.text.primary` (セマンティック参照)
- **ポケモン画像の推奨設定追加**: `shape="square"` + `pixelated="true"`
- **Heading level/size 分離設計の意図を文書化**

## 🔗 関連Issue

Partially addresses #108 (コンポーネント品質改善)

## 📷 スクリーンショット（該当する場合）

視覚的な変更はありません（トークン参照の修正とドキュメント追加のみ）

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

### Avatar Shape ガイドライン

| Shape | 推奨用途 |
|-------|----------|
| `circle` | 人物アイコン、SNSアバター |
| `rounded` | サムネイル、写真 |
| `square` | ピクセルアート、**ポケモン画像** |

### Heading Level/Size 分離

セマンティックレベル（アクセシビリティ）と視覚的サイズを分離し、柔軟なスタイリングが可能。

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
