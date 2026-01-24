## 💡 概要

AGENTS.md / Skills / Workflows の責務を明確化し、3層アーキテクチャとして整理しました。

## 📝 変更内容

### Workflows（新規作成）
- `.agent/workflows/issue.md` - Issue作成の定型手順（`/issue` で呼び出し）
- `.agent/workflows/pr.md` - PR作成の定型手順（`/pr` で呼び出し）

### AGENTS.md（リファクタリング）
- AIの性格・グローバル禁止事項に限定
- 3つの仕組みの責務分担を明文化
- 詳細な手順はWorkflowsに移譲

### Skills（整理）
- `issue-creator` Skill を削除（Workflowに統合）

### ドキュメント
- CONTRIBUTING.md に3つの仕組みの説明を追加
- Issue/PRテンプレート遵守の重要性とガードレール参照を追加

## 🔗 関連Issue

Closes #20

## 📷 スクリーンショット（該当する場合）

N/A（ドキュメント変更のみ）

## ✅ チェックリスト

- [x] コードがプロジェクトのスタイルガイドラインに従っている
- [x] 変更に対してセルフレビューを実施した
- [x] ローカルで動作確認済み

## 📌 補足事項

### 3つの仕組みの責務分担

| 仕組み | 強制力 | 用途 | 例 |
|--------|--------|------|-----|
| **AGENTS.md** | 低（任意参照） | AIの性格・禁止事項 | PowerShell禁止 |
| **Skills** | 低（AI判断） | 複雑タスクの知識 | (今後追加予定) |
| **Workflows** | 高（人間が呼び出し） | 定型作業の強制手順 | `/issue`, `/pr` |

## 📝 PRタイトルの命名規則:

`♻️ chore: organize AGENTS.md, Skills, and Workflows`

## 📖 レビュー用語集

- **AGENTS.md**: AIエージェントがグローバルに参照する指示ファイル
- **Skills**: 複雑タスクに関する知識をまとめたもの
- **Workflows**: 定型作業の手順書（スラッシュコマンドで呼び出し）
