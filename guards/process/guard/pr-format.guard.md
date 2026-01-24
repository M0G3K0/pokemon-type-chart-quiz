<!-- 🛡️ GUARDRAIL -->

# PR構成ルール（プロセスの憲法）

## @what / @why / @failure

```
@what  プルリクエスト（PR）の本文がテンプレートに従っているかを検査
@why   必要な情報（概要、変更内容、チェックリスト等）の欠落を防ぎ、高品質なレビューと記録を維持するため
@failure  必須セクションが一つでも欠けている場合、CIが失敗しマージがブロックされる
```

## 実装

- 検証スクリプト: `scripts/validate-pr-content.js`
- 必要セクションの定義: `guards/process/rules/pr-format.rules.js`

## 違反時の対応

1. CIの「PR Content Check」ステップのログを確認する
2. 欠けているセクション（例: `## 💡 概要` など）をPR本文に追加する
3. PRを更新してCIを再実行する
