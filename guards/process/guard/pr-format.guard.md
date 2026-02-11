<!-- 🛡️ GUARDRAIL -->

# PR構成ルール（プロセスの憲法）

## @what / @why / @failure

```
@what  プルリクエスト（PR）の本文がテンプレートに従っているかを検査
@why   必要な情報（概要、変更内容、チェックリスト等）の欠落を防ぎ、高品質なレビューと記録を維持するため
@failure  必須セクションが一つでも欠けている場合、CIが失敗しマージがブロックされる
```

## タイトル命名規則

PRタイトルは以下の形式に従うこと：

```
<絵文字> <type>: <description>
```

例: `✨ feat: add sound effects`

### 絵文字プレフィックス（推奨・可能な限り使用）

- 絵文字は `.agent/emoji-prefixes.json` から取得すること
- 文字化けを防ぐため、Node.js child_process を使用して gh CLI を呼び出すこと
- どうしても文字化けする場合のみ、絵文字なしを許容する

## 実装

- 検証スクリプト: `scripts/ci/validate-pr-content.js`
- 必要セクションの定義: `guards/process/rules/pr-format.rules.js`

## 違反時の対応

1. CIの「PR Content Check」ステップのログを確認する
2. 欠けているセクション（例: `## 💡 概要` など）をPR本文に追加する
3. PRを更新してCIを再実行する

