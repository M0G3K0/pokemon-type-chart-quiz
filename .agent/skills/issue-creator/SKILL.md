---
name: issue-creator
description: GitHub Issueを作成する際に使用するスキル。テンプレート準拠を保証し、作成後に警告を確認する。
---

# Issue Creator Skill

GitHub Issueを作成する際は、このスキルに従ってください。

## 🚨 必須手順

### Step 1: issue-body.md を作成

**絶対に `--body "..."` で直接本文を書かないこと！**

```bash
# ❌ 禁止
gh issue create --body "..."

# ✅ 正しい
# 1. まず issue-body.md を作成
# 2. gh issue create --body-file issue-body.md ...
```

### Step 2: テンプレートに従う

`issue-body.md` には以下のセクションが**必須**です：

```markdown
## 💡 概要
<!-- 何をするのか、なぜ必要なのか -->

## ✅ やることリスト
- [ ] タスク1
- [ ] タスク2
```

オプションで追加可能：
```markdown
## 📝 詳細
<!-- 実装イメージ、再現手順、変更範囲など -->

## 📷 参考資料
<!-- スクリーンショットや参考URL -->
```

### Step 3: ローカルで検証（推奨）

```bash
node scripts/validate-issue-local.js
```

### Step 4: Issueを作成

```bash
gh issue create --title "✨ feat: タイトル" --body-file issue-body.md
```

### Step 5: 警告コメントを確認（必須！）

**Issue作成後、必ず以下を実行して警告がないか確認:**

```bash
node scripts/check-issue-warnings.js <issue-number>
```

---

## 参照

- テンプレート: `.github/ISSUE_TEMPLATE/task.md`
- ルール: `guards/process/rules/issue-format.rules.js`
- ガードレール: `guards/process/guard/issue-format.guard.md`
