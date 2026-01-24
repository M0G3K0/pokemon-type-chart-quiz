## 💡 概要

Issue作成プロセスを簡略化し、テンプレート違反を検出しやすくしました。

## 📝 変更内容

### テンプレート統合
- 3つのテンプレート（bug_report, feature_request, refactor_task）を1つに統合
- 新しい `task.md` テンプレートを作成
- 必須セクションを「💡 概要」「✅ やることリスト」の2つに簡略化

### ローカル検証スクリプト
- `scripts/validate-issue-local.js` - issue-body.md をローカルで検証
- `scripts/check-issue-warnings.js` - Issue作成後に警告コメントを確認

### ガードレール・ドキュメント
- `guards/process/rules/issue-format.rules.js` を統一テンプレート用に更新
- `guards/process/guard/post-creation-check.guard.md` 新規作成
- Skill `issue-creator` を作成（参照用）
- AGENTS.md にIssue作成後の確認ルールを追加

## 🔗 関連Issue

- Closes #11

## 📷 スクリーンショット（該当する場合）

N/A - テンプレートとスクリプトの変更のみ

## ✅ チェックリスト

- [x] テンプレート動作確認
- [x] ローカル検証スクリプト動作確認
- [x] Issue作成後の警告確認スクリプト動作確認

## 📌 補足事項

### Before (3テンプレート)
```
.github/ISSUE_TEMPLATE/
├── bug_report.md       # バグ用
├── feature_request.md  # 機能用
└── refactor_task.md    # リファクタ用
```

### After (1テンプレート)
```
.github/ISSUE_TEMPLATE/
└── task.md  # 汎用（必須: 概要 + やることリスト）
```

## 📝 PRタイトルの命名規則:

`♻️ chore: unify issue templates and add local validation`

## 📖 レビュー用語集

- **Skill**: AI向けの複雑タスク手順書（参照は任意）
- **Workflow**: 強制力のある作業手順（今後実装予定）
