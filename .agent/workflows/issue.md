---
description: GitHub Issueを作成する手順
---

# Issue 作成ワークフロー

このワークフローは `/issue` コマンドで呼び出されます。

## 🚨 重要なルール

- **`--body "..."` で直接本文を書くことは禁止**（文字化け防止）
- **ファイル名は `issue-body.md` に固定**
- **作成後は必ず警告コメントを確認**

---

## Step 1: issue-body.md を作成

`write_to_file` ツールで `issue-body.md` を作成します。

**⚠️ テンプレートは `.github/ISSUE_TEMPLATE/task.md` を参照してください。**

全ての必須セクションが必要です。省略するとCIでエラーになります。

---

## Step 2: ローカルで検証

// turbo
```bash
node scripts/validate-issue-local.js
```

エラーがあれば `issue-body.md` を修正してください。

---

## Step 3: Issue を作成

```bash
gh issue create --title "✨ feat: add new feature" --body-file issue-body.md
```

**タイトルの形式（英語で記述）:**
- 新機能: `✨ feat: add xxx`
- バグ修正: `🐛 fix: resolve xxx`
- リファクタリング: `♻️ refactor: improve xxx`
- 基盤作業: `♻️ chore: update xxx`

---

## Step 4: 警告コメントを確認（必須！）

Issue作成後、**必ず**以下を実行してください：

// turbo
```bash
node scripts/check-issue-warnings.js <issue-number>
```

**警告があれば:**
1. `issue-body.md` を修正
2. `gh issue edit <issue-number> --body-file issue-body.md` で更新
3. 再度 `check-issue-warnings.js` を実行

---

## 参照

| 内容 | ファイル |
|------|----------|
| **Issueテンプレート（必読）** | `.github/ISSUE_TEMPLATE/task.md` |
| 検証ルール | `guards/process/rules/issue-format.rules.js` |
| ガードレール | `guards/process/guard/issue-format.guard.md` |
