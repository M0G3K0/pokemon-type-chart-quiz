---
description: GitHub Pull Requestを作成する手順
---

# PR 作成ワークフロー

このワークフローは `/pr` コマンドで呼び出されます。

## 🚨 重要なルール

- **`--body "..."` で直接本文を書くことは禁止**（文字化け防止）
- **ファイル名は `pr-body.md` に固定**
- **PR作成前にCIが通ることを確認**
- **絵文字は `.agent/emoji-prefixes.json` から取得**（AI出力の揺れによる文字化け防止）

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

**⚠️ AIは絵文字を直接タイプせず、Node.jsで取得すること！**

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

**⚠️ 絵文字はNode.jsで取得すること（文字化け防止）:**

**⚠️ TTY問題を回避するため `GH_FORCE_TTY=1` を付けること:**

```bash
# TYPE を選んだタイプに置き換え（例: feat, fix, refactor）
EMOJI=$(node -p "JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.TYPE") && GH_FORCE_TTY=1 gh pr create --title "${EMOJI} TYPE: description here" --body-file pr-body.md
```

**例:**
```bash
# feat
EMOJI=$(node -p "JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.feat") && GH_FORCE_TTY=1 gh pr create --title "${EMOJI} feat: add sound effects" --body-file pr-body.md

# fix
EMOJI=$(node -p "JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.fix") && GH_FORCE_TTY=1 gh pr create --title "${EMOJI} fix: resolve button issue" --body-file pr-body.md
```

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
| **PRテンプレート（必読）** | `.github/pull_request_template.md` |
| PR検証ルール | `guards/process/rules/pr-format.rules.js` |
| ガードレール | `guards/process/guard/pr-format.guard.md` |
