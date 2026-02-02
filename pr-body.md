## 💡 概要

コンポーネントの `:host` スタイルを一元管理する仕組みを構築し、ガードレールで強制するようにしました。

これにより：
- **一貫性**: 全コンポーネントで同じパターンを使用
- **保守性**: 変更が1箇所（`_component-base.scss`）で済む
- **AI支援**: 新規コンポーネント作成時に正しいパターンを強制（CIで検証）

## 📝 変更内容

### 1. 共通Mixin追加
- `src/styles/_component-base.scss` を新規作成
- 4つのホストタイプMixin: `host-inline`, `host-block`, `host-image`, `host-inline-text`

### 2. コンポーネントリファクタリング（7ファイル）
- `pt-button`, `pt-chip`, `pt-avatar`, `pt-heading`, `pt-text`, `pt-icon`, `pt-card`
- `:host` 内の直接スタイル定義をMixin呼び出しに置き換え

### 3. ガードレール追加
- `guards/design/guard/component-base-styles.guard.md`: ドキュメント
- `guards/design/rules/component-base-styles.rules.js`: 検証ロジック
- `guards:validate` に統合済み

## 🔗 関連Issue

Closes #57

## 📷 スクリーンショット（該当する場合）

なし（スタイル出力に変更なし）

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint:css`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

- `pt-spinner`, `pt-grid`, `pt-stack`, `pt-surface` は `:host` セレクタを使用していないため変更対象外
- 新しいガードレールは `npm run guard:component-base-styles` で個別実行可能

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
