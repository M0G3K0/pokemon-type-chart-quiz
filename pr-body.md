## 💡 概要
CIでテストが実行されていなかったため、ユニットテスト基盤を整備してCI上で自動テストを有効化します。

## 📝 変更内容
- Vitest + jsdom によるユニットテスト環境のセットアップ
- `vitest.config.ts` の作成（jsdom環境設定）
- `src/test-setup.ts` でAngular TestBed環境の初期化
- 基本的なスモークテストを追加（`app.spec.ts`, `type-chart.spec.ts`）
- `.github/workflows/pr-validation.yml` のテストステップを再有効化
- 必要な依存関係を追加（`@testing-library/angular`, `@testing-library/dom`, `jsdom` など）
- Huskyのpre-commitをWindows互換のエンコーディングに修正

## 🔗 関連Issue
Closes #4

## 📷 スクリーンショット（該当する場合）
N/A

## ✅ チェックリスト
- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [x] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [ ] 必要に応じてドキュメントを更新した

## 📌 補足事項
- 現在は基本的なスモークテストのみ追加しています
- 詳細なコンポーネントテストやE2Eテストは別のIssueで対応予定
- jsdomを採用した理由：軽量で高速なため、CIでの実行に適している

--- 

## 📝 PRタイトルの命名規則:
- [type]: [description]の形式にすること

タイプ一覧:
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

説明の書き方: 
- 英語で書くこと
- 1行で説明すること
- すべて小文字で書くこと

例: feat: add sound effects and toggle switch

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
