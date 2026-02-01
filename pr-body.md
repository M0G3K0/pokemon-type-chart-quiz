## 💡 概要

UIコンポーネントの import を **エイリアス (`@ui/`) + Barrel file (`index.ts`)** 形式に統一し、将来のミスを防ぐガードレールを追加しました。

## 📝 変更内容

### Barrel file 作成（11ファイル）
- `src/app/ui/pt-avatar/index.ts`
- `src/app/ui/pt-button/index.ts`
- `src/app/ui/pt-chip/index.ts`
- `src/app/ui/pt-grid/index.ts`
- `src/app/ui/pt-heading/index.ts`
- `src/app/ui/pt-icon/index.ts`
- `src/app/ui/pt-spinner/index.ts`
- `src/app/ui/pt-stack/index.ts`
- `src/app/ui/pt-surface/index.ts`
- `src/app/ui/pt-text/index.ts`
- `src/app/ui/pt-type-chip/index.ts`

### Import 修正
- `quiz.container.ts`: 相対パス → `@ui/<component>` 形式
- `battle-card.ts`: 直接参照 → barrel 形式
- `pt-chip.ts`, `pt-type-chip.ts`: 内部 import を barrel 形式に

### ガードレール追加
- `guards/architecture/guard/ui-import-standards.guard.md`
- `guards/architecture/rules/ui-import-standards.rules.js`
- ESLint に `no-restricted-imports` ルールを追加

## 🔗 関連Issue

Closes #89

## 📷 スクリーンショット（該当する場合）

N/A（コード品質改善のため）

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [ ] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

今後、直接ファイル参照（`@ui/pt-xxx/pt-xxx`）や相対パス（`../../ui/pt-xxx`）を使用すると ESLint がエラーを出します。

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
