---
description: GitHub Pull Requestを作成する手順
---

# PR 作成ワークフロー

このワークフローは `/pr` コマンドで呼び出されます。

## 🚨 重要なルール

- **`--body "..."` で直接本文を書くことは禁止**（文字化け防止）
- **ファイル名は `pr-body.md` に固定**
- **PR作成前にCIが通ることを確認**
- **絵文字は Node.js スクリプト内で `.agent/emoji-prefixes.json` から取得**（文字化け防止）
- **絵文字プレフィックスはなるべく付ける**（文字化けする場合のみ省略可）
- **PR作成後は必ず絵文字の文字化けを確認する**（Step 5 参照）

---

## Step 0: タイプを選択

**PRで使用するタイプ（この中から選択）:**

| タイプ | 用途 |
|--------|------|
| `feat` | 新機能実装 |
| `fix` | バグ修正 |
| `docs` | ドキュメント |
| `style` | スタイル変更 |
| `refactor` | リファクタリング |
| `perf` | パフォーマンス改善 |
| `test` | テスト |
| `build` | ビルド |
| `ci` | CI/CD |
| `chore` | その他 |
| `revert` | 変更を元に戻す |
| `breaking` | 破壊的変更 |
| `wip` | 作業中 |

**⚠️ AIは絵文字を直接タイプせず、Node.js child_process で取得すること！**

**🚫 上記以外のprefixを使わないこと！**

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

**⚠️ 重要: テンプレートを完全にコピーすること**

1. まず `.github/pull_request_template.md` を `view_file` で読む
2. **全てのセクションをコピー**（省略厳禁）
3. 各セクションの内容を埋める

**🚨 特に注意: 以下のセクションも必須**
- `## 📝 PRタイトルの命名規則:` ← 参考情報に見えるが必須
- `## 📖 レビュー用語集` ← 参考情報に見えるが必須

省略すると `npm run pr:validate` でエラーになります。

---

## Step 3: ローカルで検証

### 3-1: PR本文の検証
// turbo
```bash
npm run pr:validate
```

### 3-2: コードの検証
// turbo
```bash
npm run lint:css
npm test
```

エラーがあれば修正してからPRを作成してください。

---

## Step 4: PR を作成

**⚠️ 絵文字はNode.js child_process で取得すること（文字化け防止）:**

```bash
# TYPE と TITLE を置き換え（例: feat, fix, refactor）
node -e "const emoji = JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.TYPE; const {execSync} = require('child_process'); execSync(\`gh pr create --title \"\${emoji} TYPE: TITLE\" --body-file pr-body.md\`, {stdio: 'inherit'});"
```

**例:**
```bash
# feat
node -e "const emoji = JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.feat; const {execSync} = require('child_process'); execSync(\`gh pr create --title \"\${emoji} feat: add sound effects\" --body-file pr-body.md\`, {stdio: 'inherit'});"

# fix
node -e "const emoji = JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.fix; const {execSync} = require('child_process'); execSync(\`gh pr create --title \"\${emoji} fix: resolve button issue\" --body-file pr-body.md\`, {stdio: 'inherit'});"
```

---

## Step 5: 絵文字の文字化け確認（必須！）

PR作成後、**必ず**タイトルの絵文字が正しく表示されているか確認してください：

// turbo
```bash
gh pr view --json title
```

**確認ポイント:**
- ✅ 絵文字が正しく表示されている: `"title": "✨ feat: add sound effects"`
- ❌ 文字化けしている: `"title": "��� feat: add sound effects"`

**文字化けしていた場合:**
```bash
# 絵文字なしでタイトルを修正
gh pr edit <PR番号> --title "feat: add sound effects"
```

---

## Step 6: CIを確認

```bash
gh pr checks
```

失敗があれば修正し、再度プッシュしてください。

---

## 参照

| 内容 | ファイル |
|------|----------|
| **PRテンプレート（必読）** | `.github/pull_request_template.md` |
| **絵文字プレフィックス** | `.agent/emoji-prefixes.json` |
| PR検証ルール | `guards/process/rules/pr-format.rules.js` |
| ガードレール | `guards/process/guard/pr-format.guard.md` |

