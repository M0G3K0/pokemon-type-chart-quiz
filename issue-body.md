> ⚠️ **タイトルは英語で書いてください** (`feat: xxx`, `fix: xxx`, `chore: xxx` 等)

## 💡 概要

プロダクションビルド時に初期バンドルサイズが設定上限（500kB）を超えており、警告が発生している。

```
bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 114.40 kB with a total of 614.40 kB.
```

## 📝 詳細

### 現状

- 現在の初期バンドルサイズ: **614.40 kB**
- 設定上限（warning）: **500 kB**
- 超過分: **114.40 kB**

### 設定場所

`angular.json` の `budgets` 設定:
```json
{
  "type": "initial",
  "maximumWarning": "500kB",
  "maximumError": "750kB"
}
```

### 対応オプション

1. **バンドルサイズを削減する**
   - 不要な依存関係の削除
   - Code splitting / Lazy loading の活用
   - Tree shaking の改善

2. **budget設定を緩和する**
   - 現実的な目標値に調整（例: 700kB）

3. **警告を許容する**
   - 現状維持（エラーではないため）

## ✅ やることリスト

- [ ] バンドル分析を実施（`source-map-explorer` など）
- [ ] 主要なサイズ要因を特定
- [ ] 対応方針を決定（削減 or 設定見直し）
- [ ] 対応を実施

## 📷 参考資料（任意）

N/A
