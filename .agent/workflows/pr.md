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
| **PRテンプレート（必読）** | `.github/pull_request_template.md` |
| PR検証ルール | `guards/process/rules/pr-format.rules.js` |
| ガードレール | `guards/process/guard/pr-format.guard.md` |
