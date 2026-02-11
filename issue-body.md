> ⚠️ **タイトルは英語で書いてください** (`feat: xxx`, `fix: xxx`, `chore: xxx` 等)

## 💡 概要

NgDocのサイドバーナビゲーションで、SDK層のコンポーネント（`pt-type-chip`等）を「Components」カテゴリから「Poke SDK」カテゴリに移動する。

汎用UIコンポーネント（Molecule）とプロダクト固有のSDKコンポーネント（Organism）をナビゲーション上でも明確に分離する。

## 📝 詳細

### 現状
- 全コンポーネントが「Components」カテゴリ配下にフラットに並んでいる
- `pt-type-chip`（Organism/SDK）と`pt-chip`（Molecule/汎用）の区別がつかない

### あるべき姿
- **Components**: 汎用UIコンポーネント（`pt-chip`, `pt-button`, `pt-icon` 等）
- **Poke SDK**: プロダクト固有のラッパー（`pt-type-chip` 等、今後増える可能性あり）

### 変更対象
- `projects/docs/src/components/type-chip/ng-doc.page.ts` の `category` を変更
- 必要に応じて新しい `NgDocCategory` を作成

## ✅ やることリスト
- [ ] 「Poke SDK」カテゴリの `NgDocCategory` を作成
- [ ] `pt-type-chip` の `ng-doc.page.ts` で category を変更
- [ ] サイドバーの表示順序を確認
- [ ] ビルド確認

## 📷 参考資料（任意）

Issue #96 の議論で提起された設計方針に基づく。
