<!-- 🛡️ GUARDRAIL -->

# Issue構成ルール（プロセスの憲法）

## @what / @why / @failure

```
@what  GitHubのIssue本文がテンプレートに従っているかを検査
@why   必要な情報（概要、再現手順、todoリスト等）の欠落を防ぎ、タスクの見積もりや対応をスムーズにするため
@failure  必須セクションが一つでも欠けている場合、Issueに自動コメントが投稿され、修正を促される
```

## タイトル命名規則

Issueタイトルは以下の形式に従うこと：

```
<絵文字> <type>: <description>
```

例: `✨ feat: add sound effects`

### 絵文字プレフィックス（推奨・可能な限り使用）

- 絵文字は `.agent/emoji-prefixes.json` から取得すること
- 文字化けを防ぐため、Node.js child_process を使用して gh CLI を呼び出すこと
- どうしても文字化けする場合のみ、絵文字なしを許容する

## 実装

- 検証スクリプト: `scripts/validate-issue-content.js`
- 必要セクションの定義: `guards/process/rules/issue-format.rules.js`
- GitHub Actions: `.github/workflows/issue-validation.yml`

## 違反時の対応

1. Issue作成後、GitHub Actionsが自動でバリデーションを実行します
2. 違反がある場合、Issueに以下のようなコメントが自動投稿されます：
   ```
   ⚠️ このIssueはテンプレートの必須項目が不足しています。
   - Missing: ## 💡 概要
   - Missing: ## 📝 再現手順
   
   テンプレートに従って編集してください。
   ```
3. Issue本文を編集して、不足しているセクションを追加してください
4. 編集後、再度自動チェックが走り、問題がなければ承認コメントが投稿されます

## 関連

- [ISSUE_TEMPLATE/bug_report.md](../../.github/ISSUE_TEMPLATE/bug_report.md)
- [ISSUE_TEMPLATE/feature_request.md](../../.github/ISSUE_TEMPLATE/feature_request.md)
- [ISSUE_TEMPLATE/refactor_task.md](../../.github/ISSUE_TEMPLATE/refactor_task.md)

