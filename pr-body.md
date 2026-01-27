## 💡 概要

コンポーネント品質を保証するための3つのガードレールを追加。

## 📝 変更内容

### 新規ガードレール

| ガードレール | 検査内容 | Issue |
|-------------|---------|-------|
| `component-structure` | pt-*コンポーネントの必須ファイル（ts/spec.ts）存在確認 | #54 |
| `token-existence` | SCSSで使用されている`--pt-*`変数が定義されているか確認 | #55 |
| `component-standards` | 上記 + ドキュメント存在 + テスト内容の統合検査 | #58 |

### 追加されたnpmスクリプト

```bash
npm run guard:component-structure  # ファイル完全性チェック
npm run guard:token-existence      # トークン存在チェック
npm run guard:component-standards  # 統合チェック
```

### 検出される違反例

- `pt-button.spec.ts` が存在しない
- `--pt-border-radius-sm` を使用しているが、正しいトークン名は `--pt-semantic-border-radius-sm`
- `docs/components/pt-card.md` が存在しない
- `spec.ts` ファイルにテストケース（it/test）がない

## ✅ チェックリスト

- [x] `npm run guards:validate` 通過
- [x] 各スクリプトの動作確認済み
- [x] `guards/README.md` 更新済み

## 📷 動作確認

```
🛡️ Checking component creation standards...

📦 Found 14 pt-* component(s)

❌ Component standards violations found:

📁 Missing Required Files:
   - Missing required file: pt-badge.ts
   ...

📄 Missing Documentation:
   - Missing documentation: docs/components/pt-button.md
   ...

🧪 Empty Test Files:
   - No test cases found in: pt-avatar.spec.ts
   ...
```

Closes #54, Closes #55, Closes #58
