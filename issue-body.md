## 💡 概要

開発プロセスをシンプル化し、AI/人間どちらにとっても分かりやすい開発規約を確立します。

## 📝 変更範囲

### 1. Issueテンプレートの統一

現在3つに分かれているテンプレートを1つに統合：

**Before:**
- `bug_report.md` - バグ報告
- `feature_request.md` - 機能リクエスト
- `refactor_task.md` - リファクタリング

**After:**
- `task.md` - 汎用タスクテンプレート

**理由:**
- AIがどのテンプレートを選ぶべきか判断する必要がなくなる
- プロジェクト規模的に3つに分ける複雑さが不要
- 「概要」「やることリスト」があれば大体カバーできる

### 2. CONTRIBUTING.mdの拡充

現在の簡素な内容から、以下を含む詳細なガイドに更新：
- 開発フロー（図解付き）
- ブランチ命名規則
- コミットメッセージ規約
- Issue/PR運用
- コーディング規約
- AI開発者向けガイド
- ガードレール概要

## ✅ やることリスト

- [ ] `bug_report.md`, `feature_request.md`, `refactor_task.md` を削除
- [ ] 新しい `task.md` テンプレートを作成
- [ ] `guards/process/rules/issue-format.rules.js` を更新
- [ ] `guards/process/guard/issue-format.guard.md` を更新
- [ ] `CONTRIBUTING.md` を詳細版に更新
- [ ] CIバリデーションが通ることを確認
