<!-- 🛡️ GUARDRAIL -->

# スペーストークン 10倍命名規則

## @what / @why / @failure

```
@what  spacing.json 内のスペーストークンキーが10倍命名規則（10x multiplier）に従っているか検査
@why   半端値（05, 15）と整数値（1, 2, 4...）が混在する命名の不整合を防ぎ、スケールの一貫性を保つため
@failure  npm run guard:space-token-10x でエラーとなり、違反箇所が表示される
```

---

## ルール一覧

### 1. キー命名規則

`space` オブジェクト内の全キーは以下のいずれかの形式であること：

| 形式 | 許可パターン | 例 |
|------|-------------|-----|
| ゼロ | `00` | `space.00` (0px) |
| 半端値 | `05`, `15` | `space.05` (2px), `space.15` (6px) |
| 10倍表記 | `N0` (N=1-9) または `N00` (N=1-9) | `space.10` (4px), `space.100` (40px) |

### 2. 禁止パターン

以下の形式は禁止：

- **単一桁の整数**: `space.1`, `space.2`, `space.4` ... → `space.10`, `space.20`, `space.40` ... を使う
- **2桁以上の整数**: `space.10`（40pxの意味）, `space.12`, `space.16` ... → `space.100`, `space.120`, `space.160` ... を使う
  - ⚠️ `space.10` は10倍表記では `4px` を意味する。`40px` は `space.100`

### 3. 参照規則

Tier 2/Tier 3 の JSON ファイル内の `{space.X}` 参照もこの命名規則に従うこと。

---

## 実装

### ルールファイル

**ソースオブトゥルース**: [`space-token-10x.rules.js`](../rules/space-token-10x.rules.js)

### 使用方法

```bash
npm run guard:space-token-10x
```

### 統合

`package.json` の `scripts` にカスタムスクリプトとして登録。

---

## 違反時の対応

1. `npm run guard:space-token-10x` でエラーを確認
2. エラーメッセージに表示されたキーを10倍表記にリネーム
3. 参照箇所（`{space.X}`）も合わせて更新
4. `npm run tokens:build` で再生成
5. `npm run build` で全体ビルド確認

### 例

```json
// ❌ Bad: 旧命名
{
  "space": {
    "1": { "value": "0.25rem" },
    "2": { "value": "0.5rem" },
    "10": { "value": "2.5rem" }
  }
}

// ✅ Good: 10倍命名
{
  "space": {
    "10": { "value": "0.25rem" },
    "20": { "value": "0.5rem" },
    "100": { "value": "2.5rem" }
  }
}
```

---

## 関連

- [Guards README](../../README.md)
- [Token Naming](../guard/token-naming.guard.md)
