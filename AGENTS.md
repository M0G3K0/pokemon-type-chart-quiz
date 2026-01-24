# AI Agent Instructions

このファイルはAIエージェントが自動的に参照するグローバル指示です。

## 🚨 禁止事項

### PowerShellでのファイル編集禁止

```
❌ Set-Content, Add-Content, Out-File, >> 演算子
```

**理由**: 日本語や絵文字がエンコーディングの問題でバグるため。

**代わりに**: AIエージェントの専用ツール（write_to_file, replace_file_content等）を使用すること。

## ✅ 優先ツール

| 操作 | 使用すべきツール |
|------|------------------|
| ファイル作成/編集 | AIツール（write_to_file等） |
| Git操作 | GitHub CLI (`gh`) |
| PR作成 | `gh pr create --body-file pr-body.md` |
| Issue作成 | `gh issue create --body-file issue-body.md` |

**重要ルール**: 
1. PR/Issue作成時は必ず `--body-file` を使用すること（文字化け防止）。
2. 本文ファイル名は **`pr-body.md`** または **`issue-body.md`** に固定すること。`issue-body-01.md` 等の別名は禁止。
3. ファイルは毎回 **上書き** して使用すること。


## 📚 参照ドキュメント

| 内容 | ファイル |
|------|----------|
| 開発規約（詳細） | `CONTRIBUTING.md` |
| ガードレール | `guards/README.md` |
| 開発ワークフロー | `/development` コマンドで呼び出し |

## 🛡️ ガードレール

`guards/` ディレクトリに定義されたルールに従うこと。
違反時のエラーメッセージには対応する `.guard.md` ファイルパスが含まれる。

### ガードレールの作成・修正
新しいガードレールを作成する際は `guards/README.md` と `guards/meta/guard/guardrail-format.guard.md` を参照すること。
ルール配列定義時は `utils/rule-helper.js` の使用が推奨される。
