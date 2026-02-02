---
description: GitHub Issueを作成する手順
---

# Issue 作成ワークフロー

このワークフローは `/issue` コマンドで呼び出されます。

## 🚨 重要なルール

- **`--body "..."` で直接本文を書くことは禁止**（文字化け防止）
- **ファイル名は `issue-body.md` に固定**
- **作成後は必ず警告コメントを確認**
- **絵文字は Node.js spawnSync で取得**（シェル経由を避けて文字化け防止）
- **絵文字プレフィックスはなるべく付ける**（文字化けする場合のみ省略可）
- **Issue作成後は必ず絵文字の文字化けを確認する**

---

## Step 0: タイプを選択

**Issueで使用するタイプ（この中から選択）:**

| タイプ | 用途 |
|--------|------|
| `feat` | 新機能リクエスト |
| `bug` | バグ報告 |
| `question` | 質問・議論 |
| `docs` | ドキュメント改善 |
| `perf` | パフォーマンス問題 |

**⚠️ AIは絵文字を直接タイプせず、Node.js spawnSync で取得すること！**

**🚫 上記以外のprefixを使わないこと！**

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

**⚠️ 絵文字はNode.js spawnSync で取得すること（シェル経由を避けて文字化け防止）:**

```bash
# TYPE と TITLE を置き換え（例: feat, bug, question）
node -e "const { spawnSync } = require('child_process'); const emoji = JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.TYPE; const title = emoji + ' TYPE: TITLE'; spawnSync('gh', ['issue', 'create', '--title', title, '--body-file', 'issue-body.md'], { stdio: 'inherit' });"
```

**例:**
```bash
# feat
node -e "const { spawnSync } = require('child_process'); const emoji = JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.feat; const title = emoji + ' feat: add sound effects'; spawnSync('gh', ['issue', 'create', '--title', title, '--body-file', 'issue-body.md'], { stdio: 'inherit' });"

# bug
node -e "const { spawnSync } = require('child_process'); const emoji = JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.bug; const title = emoji + ' bug: button not responding'; spawnSync('gh', ['issue', 'create', '--title', title, '--body-file', 'issue-body.md'], { stdio: 'inherit' });"
```

---

## Step 4: 絵文字の文字化け確認（必須！）

Issue作成後、**必ず**タイトルの絵文字が正しく表示されているか確認してください：

// turbo
```bash
gh issue view <issue-number> --json title
```

**確認ポイント:**
- ✅ 絵文字が正しく表示されている: `"title": "✨ feat: add sound effects"`
- ❌ 文字化けしている: `"title": "��� feat: add sound effects"`

**文字化けしていた場合:**
```bash
# 絵文字なしでタイトルを修正
gh issue edit <issue-number> --title "feat: add sound effects"
```

---

## Step 5: 警告コメントを確認（必須！）

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
| **絵文字プレフィックス** | `.agent/emoji-prefixes.json` |
| 検証ルール | `guards/process/rules/issue-format.rules.js` |
| ガードレール | `guards/process/guard/issue-format.guard.md` |
