## 💡 概要

ガードレール違反が発生した際のエラーメッセージを改善し、関連する `.guard.md` ファイルへの直接リンクを表示するようにしました。

## 📝 変更内容

- `guards/process/rules/*.rules.js` に `GUARDRAIL_PATH` 定数を追加・エクスポート
- バリデーションスクリプトでCI環境ではGitHub URL形式でリンクを表示
- エラーメッセージを構造化して読みやすく改善
- 全バリデーションスクリプト間で一貫した出力フォーマット

## 🔗 関連Issue

Closes #5

## 📷 スクリーンショット（該当する場合）

N/A（コンソール出力の改善）

## ✅ チェックリスト

- [x] ビルドが成功する（`npm run build`）
- [x] Lintエラーがない（`npm run lint:css`）
- [x] テストが通る（`npm run test`）
- [x] コミットメッセージが規約に従っている
- [x] ブランチ名が規約に従っている
- [x] 必要に応じてドキュメントを更新した

## 📌 補足事項

### 変更されたファイル

| ファイル | 変更内容 |
|----------|----------|
| `guards/process/rules/pr-format.rules.js` | `GUARDRAIL_PATH` エクスポート追加 |
| `guards/process/rules/issue-format.rules.js` | `GUARDRAIL_PATH` エクスポート追加 |
| `scripts/validate-pr-content.js` | エラーメッセージ強化、CIでGitHub URL表示 |
| `scripts/validate-issue-content.js` | エラーメッセージ強化、CIでGitHub URL表示 |
| `scripts/validate-pr-local.js` | `GUARDRAIL_PATH` 使用 |
| `scripts/validate-issue-local.js` | `GUARDRAIL_PATH` 使用 |

## 📝 PRタイトルの命名規則:

`🔧 chore: enhance guardrail violation feedback with links`

## 📖 レビュー用語集

- **GUARDRAIL_PATH**: ガードレールドキュメントへの相対パス
- **CI**: GitHub Actions等の継続的インテグレーション環境
