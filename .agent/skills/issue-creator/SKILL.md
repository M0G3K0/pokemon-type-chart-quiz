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

`issue-body.md` には以下のセクションが必須です：

#### Feature Request の場合
```markdown
## 💡 概要
（内容）

## 📝 実装イメージ
（内容）

## ✅ やることリスト
- [ ] タスク1
- [ ] タスク2
```

#### Bug Report の場合
```markdown
## 💡 概要
（内容）

## 📝 再現手順
（内容）

## 📌 期待される挙動
（内容）
```

#### Refactor/Chore の場合
```markdown
## 💡 概要
（内容）

## ✅ やることリスト
- [ ] タスク1
```

### Step 3: ローカルで検証（推奨）

```bash
node scripts/validate-issue-local.js
```

### Step 4: Issueを作成

```bash
gh issue create --title "✨ feat: タイトル" --body-file issue-body.md --label "enhancement"
```

### Step 5: 警告コメントを確認（必須！）

**Issue作成後、必ず以下を実行して警告がないか確認:**

```bash
node scripts/check-issue-warnings.js <issue-number>
```

または:
```bash
gh issue view <issue-number> --comments
```

`github-actions` botから警告コメントがあれば、修正してから次の作業に進むこと。

---

## 参照

- テンプレートルール: `guards/process/rules/issue-format.rules.js`
- ガードレール: `guards/process/guard/issue-format.guard.md`
- 作成後チェック: `guards/process/guard/post-creation-check.guard.md`
