---
description: GitHub Issueを作成する手順
---

# Issue 作成ワークフロー

このワークフローは `/issue` コマンドで呼び出されます。

## 🚨 重要なルール

- **`--body "..."` で直接本文を書くことは禁止**（文字化け防止）
- **ファイル名は `issue-body.md` に固定**
- **作成後は必ず警告コメントを確認**
- **絵文字は `.agent/emoji-prefixes.json` から取得**（AI出力の揺れによる文字化け防止）

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

**⚠️ AIは絵文字を直接タイプせず、Node.jsで取得すること！**

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

**⚠️ 絵文字はNode.jsで取得すること（文字化け防止）:**

```bash
# TYPE を選んだタイプに置き換え（例: feat, bug, question）
EMOJI=$(node -p "JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.TYPE") && gh issue create --title "${EMOJI} TYPE: description here" --body-file issue-body.md
```

**例:**
```bash
# feat
EMOJI=$(node -p "JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.feat") && gh issue create --title "${EMOJI} feat: add sound effects" --body-file issue-body.md

# bug
EMOJI=$(node -p "JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.bug") && gh issue create --title "${EMOJI} bug: button not responding" --body-file issue-body.md
```

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
