# AI Agent Instructions

このファイルはAIエージェントが自動的に参照するグローバル指示です。

> **このファイルの役割**: AIの性格・グローバル禁止事項のみを定義。
> 定型作業の手順は `/.agent/workflows/` を参照。

---

## 🚨 禁止事項

### PowerShellでのファイル編集禁止 ❌

```
Set-Content, Add-Content, Out-File, >> 演算子
```

**理由**: 日本語や絵文字がエンコーディングの問題でバグるため。

**代わりに**: AIエージェントの専用ツール（`write_to_file`, `replace_file_content`等）を使用すること。

### `--body "..."` での直接指定禁止 ❌

PR/Issue作成時にインラインで本文を指定すると文字化けの原因になる。

**必ず `--body-file` を使用すること。**

### `ng test` の直接実行禁止 ❌

```
ng test
```

**理由**: Angular 21 + Vitest 4 の統合にバグがあり、`ng test` は動作しない。

**代わりに**: `npm run test` を使用すること（内部で `vitest run` が実行される）。

---

## ✅ 優先ツール

| 操作 | 使用すべきツール |
|------|------------------|
| ファイル作成/編集 | AIツール（`write_to_file`等） |
| Git操作 | GitHub CLI (`gh`) |
| PR作成 | `/pr` ワークフロー |
| Issue作成 | `/issue` ワークフロー |

---

## 📚 参照ドキュメント

| 内容 | ファイル |
|------|----------|
| 開発規約（詳細） | `CONTRIBUTING.md` |
| ガードレール | `guards/README.md` |
| Issue作成手順 | `.agent/workflows/issue.md` |
| PR作成手順 | `.agent/workflows/pr.md` |

---

## 🛡️ ガードレール

`guards/` ディレクトリに定義されたルールに従うこと。
違反時のエラーメッセージには対応する `.guard.md` ファイルパスが含まれる。

### ガードレールの作成・修正

新しいガードレールを作成する際は以下を参照：
- `guards/README.md`
- `guards/meta/guard/guardrail-format.guard.md`

ルール配列定義時は `utils/rule-helper.js` の使用が推奨される。

---

## 🔧 3つの仕組みの違い

| 仕組み | 強制力 | 用途 | 例 |
|--------|--------|------|-----|
| **AGENTS.md** (このファイル) | 低（任意参照） | AIの性格・禁止事項 | PowerShell禁止、文字化け防止 |
| **Skills** | 低（AI判断） | 複雑タスクの知識 | コードレビュー、デザインシステム |
| **Workflows** | 高（人間が呼び出し） | 定型作業の強制手順 | Issue作成、PR作成 |

