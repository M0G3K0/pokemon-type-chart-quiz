<!-- 🛡️ GUARDRAIL -->

# UI Component Import Standards / UIコンポーネント import 規約

## @what / @why / @failure

```
@what  UIコンポーネントの import はエイリアス (@ui/) + Barrel file (index.ts) 経由で行う
@why   カプセル化・一貫性・リファクタリング耐性を確保するため
@failure  直接参照を許可するとファイル名変更時に大量のimportが壊れる
```

---

## ルール一覧

### Rule 1: エイリアス必須

```typescript
// ❌ 禁止: 相対パス
import { StackComponent } from '../../ui/pt-stack/pt-stack';
import { StackComponent } from '../../ui/pt-stack';

// ✅ 正解: エイリアス経由
import { StackComponent } from '@ui/pt-stack';
```

### Rule 2: Barrel file 必須

```typescript
// ❌ 禁止: 直接ファイル参照
import { StackComponent } from '@ui/pt-stack/pt-stack';

// ✅ 正解: Barrel file 経由
import { StackComponent } from '@ui/pt-stack';
```

### Rule 3: 全コンポーネントに index.ts が必要

各 `src/app/ui/pt-*` ディレクトリには必ず `index.ts` (barrel file) を作成する。

---

## 実装

- **ESLint ルール**: `guards/architecture/rules/ui-import-standards.rules.js`
- **設定ファイル**: `eslint.config.js`

---

## 違反時の対応

1. import パスを `@ui/<component-name>` 形式に修正
2. 対象コンポーネントに `index.ts` がなければ作成
3. `npm run lint` でエラーが解消されたことを確認

---

## 例外

- UIコンポーネント**内部**での相対 import（同一ディレクトリ内）は許可
  - 例: `pt-card-header.ts` が `./pt-card.ts` を import する場合

---

## 参照

- [TypeScript Barrel Pattern](https://basarat.gitbook.io/typescript/main-1/barrel)
- Issue #89: Unify Design System imports to use barrel files
