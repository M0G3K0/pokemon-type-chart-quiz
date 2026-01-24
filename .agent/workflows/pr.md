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

### 必須セクション

```markdown
## 📝 概要
<!-- このPRで何をしたか -->

## 🔗 関連Issue
Closes #<issue-number>

## ✅ 変更内容
- [ ] 変更点1
- [ ] 変更点2

## 🧪 テスト
- [ ] ローカルで動作確認済み
- [ ] 新しいテストを追加（該当する場合）
```

### オプションセクション

```markdown
## 📷 スクリーンショット
<!-- UI変更がある場合 -->

## ⚠️ 破壊的変更
<!-- 該当する場合のみ -->

## 📋 レビュアーへのメモ
<!-- 特に見てほしいポイント -->
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

**タイトルの形式（英語で記述）:**
- 新機能: `✨ feat: add xxx`
- バグ修正: `🐛 fix: resolve xxx`
- リファクタリング: `♻️ refactor: improve xxx`
- 基盤作業: `♻️ chore: update xxx`

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
| PR検証ルール | `guards/process/rules/pr-format.rules.js` |
| ガードレール | `guards/process/guard/pr-format.guard.md` |
