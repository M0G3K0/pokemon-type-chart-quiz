## 💡 概要

UI実装（SCSS/CSS）でPrimitiveトークン（`--pt-color-gray-500`等）を直接使用せず、必ずSemantic/Componentトークンを経由するようにリファクタリングする。

## 📝 実装イメージ

### Before（現状）
```scss
// コンポーネントで直接Primitiveを使用
.pt-card {
  background-color: var(--pt-color-gray-50);  // ❌ Primitive直接使用
  border: 1px solid var(--pt-color-gray-200);
}
```

### After（改善後）
```scss
// Semantic/Componentトークン経由
.pt-card {
  background-color: var(--pt-card-bg-default);  // ✅ Component token
  border: 1px solid var(--pt-color-border-subtle); // ✅ Semantic token
}
```

### 強制ルール案
- Stylelintで `--pt-color-*` （Primitiveパターン）の直接使用を検出
- または dependency-cruiser のようなルールで検証

## ✅ やることリスト

### 調査
- [ ] 現在のSCSS/CSSでPrimitiveトークンを直接使用している箇所を洗い出し
- [ ] それぞれに対応するSemantic/Componentトークンを特定

### リファクタ
- [ ] `pt-button.scss`: Primitiveトークン → Componentトークン
- [ ] `pt-badge.scss`: Primitiveトークン → Componentトークン
- [ ] `pt-card.scss`: Primitiveトークン → Componentトークン
- [ ] その他の箇所

### 強制ルール（オプション）
- [ ] Stylelintルールで `--pt-color-gray-*` 等の直接使用を警告
- [ ] またはガードレールで検出

## 📋 完了条件

- [ ] 全コンポーネントでPrimitiveトークンの直接使用がゼロ
- [ ] ビルド・テスト通過

## 🔗 関連

- #6 Design System
- #12 カラートークン再設計
- #15 Spacing/Elevation/Motion再設計（Closed）
