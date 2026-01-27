## 💡 概要

Design System コンポーネントの import が barrel file (`index.ts`) 経由ではなく、直接ファイル参照になっている箇所を修正する。

## 📝 詳細

### 現状の問題

```typescript
// ❌ 直接参照（現状）
import { StackComponent } from '../../ui/pt-stack/pt-stack';

// ✅ barrel 経由（理想）
import { StackComponent } from '../../ui/pt-stack';
```

### 影響範囲

以下のファイルで直接参照を使用中（計10件）:

**quiz.container.ts (4件)**
- `pt-stack/pt-stack`
- `pt-surface/pt-surface`
- `pt-grid/pt-grid`
- `pt-text/pt-text`

**battle-card.ts (6件)**
- `pt-type-chip/pt-type-chip`
- `pt-avatar/pt-avatar`
- `pt-icon/pt-icon`
- `pt-stack/pt-stack`
- `pt-surface/pt-surface`
- `pt-text/pt-text`

### 必要な対応

1. 各 `pt-*` ディレクトリに `index.ts` (barrel file) を作成/確認
2. import パスを barrel 経由に変更
3. ガードレールを追加して今後の直接参照を防止

## ✅ やることリスト

- [ ] 不足している `index.ts` の作成
- [ ] `quiz.container.ts` の import 修正
- [ ] `battle-card.ts` の import 修正
- [ ] （任意）ESLint ルールで直接参照を禁止

## 📷 参考資料（任意）

- https://basarat.gitbook.io/typescript/main-1/barrel
