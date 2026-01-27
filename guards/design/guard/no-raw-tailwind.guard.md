<!-- 🛡️ GUARDRAIL -->

# Raw Tailwind クラス使用禁止

## @what / @why / @failure

```
@what  テンプレート内での生 Tailwind ユーティリティクラス使用を禁止
@why   Design System First - UI は pt-* コンポーネントを通じて表現すべき。Tailwind と Design Tokens の混在を防ぐ
@failure  npm run guards:validate が失敗し、CI でブロックされる
```

---

## ルール一覧

### 禁止パターン

| カテゴリ | 禁止例 | 代替 |
|----------|--------|------|
| **Typography** | `text-lg`, `text-xl`, `font-bold`, `font-black` | `<pt-text variant="body-lg">` |
| **Color** | `text-slate-400`, `bg-blue-500` | `<pt-text color="secondary">` または CSS変数 |
| **Spacing** | `mb-8`, `px-2`, `mt-4`, `py-3` | `<pt-stack gap="lg">` または CSS変数 |
| **Sizing** | `min-w-32`, `h-80`, `w-full` | SCSS で `var(--pt-spacing-*)` 使用 |

### 許可パターン

- `src/styles.scss` での Tailwind `@import`（ベースリセット用）
- `styles/generated/` 内のファイル（自動生成）

## 実装

- **ルールファイル**: `guards/design/rules/no-raw-tailwind.rules.js`
- **検証スクリプト**: `npm run guards:validate` に統合

## 違反時の対応

1. エラーメッセージに表示されたファイルと行を確認
2. 該当の Tailwind クラスを `pt-*` コンポーネントまたは Design Token に置換
3. 置換方法がわからない場合は Issue #74 の対応方針を参照

### 例

```html
<!-- ❌ 違反 -->
<span class="text-lg font-bold text-slate-400">テキスト</span>

<!-- ✅ 修正後 -->
<pt-text variant="body-lg" weight="bold" color="secondary">テキスト</pt-text>
```
