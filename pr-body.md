## 💡 概要

Phase 2 のトークン修正を実施。Tier3コンポーネントトークンを追加し、コンポーネントSCSSをTier3トークン参照に更新しました。

## 📝 変更内容

### Tier3トークンファイル新規作成
- `design-tokens/tier3-component/icon.json` - アイコンサイズと色トークン
- `design-tokens/tier3-component/spinner.json` - スピナーサイズ、ボーダー幅、色、アニメーション時間
- `design-tokens/tier3-component/text.json` - テキスト色トークン（Typographyは意図的にTier2直接参照）
- `design-tokens/tier3-component/chip.json` - チップのパディング、ギャップ、フォント、角丸
- `design-tokens/tier3-component/type-chip.json` - Pokemonタイプチップのテキスト色

### コンポーネントSCSS更新
- `pt-spinner.scss` - 無効なトークン参照（`--spacing-4`等）をTier3トークン参照に修正
- `pt-icon.scss` - Tier3トークン参照に更新
- `pt-chip.scss` - Tier3トークン参照に更新
- `pt-text.scss` - 色をTier3トークン参照に更新

### 設定ファイル更新
- `style-dictionary.config.mjs` - TypeScript出力に新規コンポーネントを追加

## 🔗 関連Issue

Partially addresses:
- #107 (standardize Tier3 token strategy)
- #56 (validate design token usage)

## 📷 スクリーンショット（該当する場合）

UI変更なし（トークン参照の内部修正のみ）

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

### トークン設計方針
- **全てのUIコンポーネントにTier3トークンを作成する** という方針（`docs/decisions/token-strategy.md`参照）
- `pt-text` はTypographyについてはTier2を直接参照（意図的な設計）、色のみTier3

### 修正された問題
- `pt-spinner` が参照していた `--spacing-4`, `--spacing-10`, `--spacing-16`, `--color-primary`, `--color-secondary` は存在しないトークンだった
- これらを正しいTier3トークン `--pt-spinner-size-*`, `--pt-spinner-color-*` に修正

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
