---
description: GitHub Pull Requestを作成する手順
---

# PR 作成ワークフロー

このワークフローは `/pr` コマンドで呼び出されます。

## 🚨 重要なルール

- **`--body "..."` で直接本文を書くことは禁止**（文字化け防止）
- **ファイル名は `pr-body.md` に固定**
- **PR作成前にCIが通ることを確認**

---

## Step 1: 変更をコミット・プッシュ

```bash
git add <files>
git commit -m "feat: add xxx"
git push origin <branch-name>
```

---

## Step 2: pr-body.md を作成

`write_to_file` ツールで `pr-body.md` を作成します。

### テンプレート（`.github/pull_request_template.md` と同じ）

```markdown
## 💡 概要
<!-- このPRで何を実現するか、簡潔に説明してください -->

## 📝 変更内容
<!-- 主な変更点をリストアップしてください -->

## 🔗 関連Issue
<!-- 
このPRで解決するIssueがあればリンクしてください
例: Closes #5 (PRマージ時に自動でIssue #5がクローズされます)
-->

## 📷 スクリーンショット（該当する場合）
<!-- UI変更がある場合は、スクリーンショットを添付してください -->

## ✅ チェックリスト
<!-- 該当する項目にチェックを入れてください -->
- [ ] ビルドが成功する（`npm run build`）
- [ ] Lintエラーがない（`npm run lint`）
- [ ] テストが通る（`npm run test`）
- [ ] コミットメッセージが規約に従っている（`feat:`, `fix:`, `chore:`など）
- [ ] ブランチ名が規約に従っている（`feature/`, `fix/`, `chore/`など）
- [ ] 必要に応じてドキュメントを更新した


## 📌 補足事項
<!-- その他、レビュワーに伝えたいことがあれば記載してください -->

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
```

---

## Step 3: ローカルで検証

// turbo
```bash
npm run lint
npm test
```

エラーがあれば修正してからPRを作成してください。

---

## Step 4: PR を作成

```bash
gh pr create --title "✨ feat: add new feature" --body-file pr-body.md
```

**タイトルの形式（英語、小文字で記述）:**
- 新機能: `✨ feat: add xxx`
- バグ修正: `🐛 fix: resolve xxx`
- リファクタリング: `♻️ refactor: improve xxx`
- 基盤作業: `🔧 chore: update xxx`

---

## Step 5: CIを確認

```bash
gh pr checks
```

失敗があれば修正し、再度プッシュしてください。

---

## 参照

| 内容 | ファイル |
|------|----------|
| PRテンプレート | `.github/pull_request_template.md` |
| PR検証ルール | `guards/process/rules/pr-format.rules.js` |
| ガードレール | `guards/process/guard/pr-format.guard.md` |
