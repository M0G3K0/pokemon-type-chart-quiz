<!-- 🛡️ GUARDRAIL -->

# Issue/PR作成後の検証ルール

## @what / @why / @failure

```
@what  Issue/PR作成後にGitHub Actionsの警告コメントを確認する
@why   テンプレート違反に気づかずに放置することを防ぐため
@failure  警告コメントが存在する場合、対応せずに次の作業に進むと品質が低下する
```

---

## 対象

- 新規Issue作成後
- 新規PR作成後
- Issue/PR本文の編集後

---

## ルール

### 1. Issue作成後は必ず確認

Issue作成後、以下のいずれかで確認すること：

```bash
# 方法1: GitHub CLIで確認
gh issue view <issue-number> --comments

# 方法2: スクリプトで確認
node scripts/check-issue-warnings.js <issue-number>
```

### 2. 警告コメントがあれば修正

`github-actions` botから「テンプレートの必須項目が不足」などのコメントがあれば：

1. Issue本文を修正
2. `gh issue edit <number> --body-file issue-body.md`
3. 再度確認

### 3. ローカルで事前検証（推奨）

Issue作成前に `issue-body.md` を検証：

```bash
node scripts/validate-issue-local.js [bug|feature|refactor]
```

---

## 実装

- 確認スクリプト: `scripts/check-issue-warnings.js`
- ローカル検証: `scripts/validate-issue-local.js`
- CI検証: `.github/workflows/issue-validation.yml`

---

## 違反時の対応

1. `gh issue view <number> --comments` でbotコメントを確認
2. 不足しているセクションを追加
3. `gh issue edit <number> --body-file issue-body.md` で更新
4. 再度確認してbotコメントがなければOK

---

## AI開発者向けガイド

### Issue作成時のワークフロー

```
1. issue-body.md を作成
2. node scripts/validate-issue-local.js でローカル検証
3. gh issue create --body-file issue-body.md ...
4. node scripts/check-issue-warnings.js <number> で確認
5. 警告があれば修正して再確認
```

### やってはいけないこと

- `--body "..."` で直接本文を書く（テンプレート違反のリスク）
- Issue作成後に確認せず次の作業に進む
- 警告コメントを無視する

---

## 関連

- [Issue Format Guard](./issue-format.guard.md)
- [PR Format Guard](./pr-format.guard.md)
- [AGENTS.md](../../../AGENTS.md)
