## 💡 概要
knip.config.jsの除外ルールを定期的に見直すためのリマインダー機能を追加する。

## 📝 実装イメージ

### 方法1: GitHub Actions Scheduled Workflow
```yaml
on:
  schedule:
    - cron: '0 0 1 * *'  # 毎月1日
```

knip.config.jsをパースして`TODO`コメントがあれば自動でIssueを作成。

### 方法2: 手動チェック用スクリプト
`npm run knip:check-exclusions` でTODOコメント付きの除外を一覧表示。

## 📷 参考資料（該当する場合）
- 現在のknip.config.js

## ✅ やることリスト
- [ ] 方法を決定
- [ ] 実装
- [ ] 動作確認

## 🔗 関連（該当する場合）
- Issue #34 (knip除外削除トリガー)
