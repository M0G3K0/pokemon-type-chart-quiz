## 💡 概要

RadioButtonの縦方向余白を調整し、よりコンパクトなレイアウトを実現。

## 📝 変更内容

### トークン変更
- `--pt-radio-button-padding-y`: `spacing.content.md` → `spacing.content.sm`

### 理由
- 縦方向の余白が大きすぎるという報告 (#108) への対応
- Quiz選択肢がよりコンパクトに表示されるように

## 🔗 関連Issue

- Partially addresses #108 (comprehensive UI component quality review)

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

選択時の色問題については、トークン設定自体は適切（inverse色が指定されている）。実際のアプリで確認が必要。

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
