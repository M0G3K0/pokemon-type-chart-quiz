## 💡 概要
デザインシステム Tier 1 Primitive として `pt-spinner` コンポーネントを実装し、コンポーネントドキュメント作成ワークフローを確立します。

## 📝 変更内容
- `pt-spinner` コンポーネントの実装
  - サイズバリアント: `sm` / `md` / `lg`
  - 色バリアント: `primary` / `secondary`
  - アクセシビリティ: `role="status"`, `aria-label`
- `docs/components/pt-spinner.md` ドキュメント作成
  - GitHub Primer, Material Design 3 をベンチマーク
  - When to use / Anti-patterns / Design Patterns を文書化
- `docs/README.md` 追加
  - コンポーネント一覧とステータス
  - NgDoc導入計画（Phase 5）のロードマップ
- `/component-doc` ワークフローの追加（NgDoc導入までの暫定対応）
- `.gemini/plans/design-system-implementation.md` の削除（Knowledge Item が SSOT）

## 🔗 関連Issue
Closes #6 (部分対応: Phase 4 の新規 Atoms コンポーネント実装)

## 📷 スクリーンショット（該当する場合）
N/A（UIコンポーネント単体、実画面への統合は別Issue）

## ✅ チェックリスト
- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）※ pt-spinnerは `it.todo()` でPhase 3まで保留
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項
- **テストについて**: 現在の `vitest.config.ts` は `environment: 'node'` のため、Angular コンポーネントのインポートが JIT コンパイラを要求しテストが失敗します。Phase 3（コンポーネントテスト環境整備）まで `it.todo()` として保留しています。
- **ドキュメントワークフロー**: NgDoc(Phase 5)導入まで、`docs/components/` に Markdown ドキュメントを手動作成する暫定運用です。

--- 

## 📝 PRタイトルの命名規則:
- `type: description` の形式にすること（Conventional Commits）
- **英語で書くこと**（commitlint で検証されます）

タイプ一覧（絵文字は任意）:
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
