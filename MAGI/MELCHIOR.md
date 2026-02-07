# MELCHIOR-1: 科学者としての判断

> 「この設計は論理的に正しいか？」
> リツコ（技術部長 / Design Guard）が照会するナレッジベース。

---

## 1. デザイントークン体系

### トークン階層（Tier 1 → 2 → 3）

```
Tier 1: Primitive（原子）
  → 色、スペース、タイポグラフィの生の値
  → 例: --pt-color-gray-800, --pt-space-20

Tier 2: Semantic（意味）
  → Tier 1 をラップし「何のための値か」を付与
  → 例: --pt-spacing-content-sm, --pt-font-size-md

Tier 3: Component（コンポーネント専用）
  → Tier 2 をラップし「どのコンポーネントのどこに使うか」を限定
  → 例: --pt-button-padding-x-sm, --pt-chip-radius
```

### 🔴 最重要ルール: コンポーネントSCSSではTier 3のみ使用可能

```
❌ 禁止: var(--pt-color-gray-800)         ← Tier 1
❌ 禁止: var(--pt-spacing-content-sm)     ← Tier 2
✅ 許可: var(--pt-button-padding-x-sm)    ← Tier 3
```

**理由**: Tier 3 を強制することで:
1. NgDocのトークンテーブルをJSONから完全自動生成できる
2. コンポーネントの依存先が明示的になる
3. トークン変更の影響範囲が限定される

**検証**: `npm run lint:css` (Stylelint)
**ガードレール**: `guards/design/guard/token-naming.guard.md`

### トークン定義ファイル（SSoT）

```
design-tokens/
├── tier1-primitive/
│   ├── colors.json          # 色パレット（gray, pokemon, etc.）
│   ├── colors-pokemon.json  # ポケモンタイプ色
│   ├── effects.json         # シャドウ・エフェクト
│   ├── spacing.json         # スペーシング（10x scale: key = rem * 40）
│   └── typography.json      # フォントサイズ・ウェイト・行間
├── tier2-semantic/
│   ├── colors.json          # 意味的な色（surface, text, border）
│   ├── effects.json         # 意味的なエフェクト（elevation）
│   ├── spacing.json         # 意味的なスペーシング（content, layout, gap）
│   └── typography.json      # 意味的なタイポグラフィ（body, label, heading）
└── tier3-component/         # コンポーネント専用トークン
    ├── avatar.json
    ├── button.json
    ├── card.json
    ├── chip.json
    ├── grid.json
    ├── heading.json
    ├── icon.json
    ├── radio-button.json
    ├── spinner.json
    ├── stack.json
    ├── surface.json
    ├── text.json
    └── type-chip.json
```

### スペーストークン命名規則（10x Scale）

```
ルール: キー名 = CSS rem値 × 40
例: 0.1rem → key "4",  0.25rem → key "10",  0.5rem → key "20"

検証: npm run guard:space-token-10x
ガードレール: guards/design/guard/space-token-10x.guard.md
```

---

## 2. コンポーネントカタログ

### 全13コンポーネント

| コンポーネント | 用途 | Tier 3 JSON |
|-------------|------|-------------|
| `pt-avatar` | ユーザーアバター表示 | `avatar.json` |
| `pt-button` | アクションボタン（primary/secondary/ghost/danger × sm/md/lg） | `button.json` |
| `pt-card` | コンテンツカード | `card.json` |
| `pt-chip` | タグ・バッジ表示 | `chip.json` |
| `pt-grid` | グリッドレイアウト | `grid.json` |
| `pt-heading` | 見出しテキスト（h1〜h6） | `heading.json` |
| `pt-icon` | SVGアイコン表示 | `icon.json` |
| `pt-radio-button` | ラジオボタン選択 | `radio-button.json` |
| `pt-spinner` | ローディング表示 | `spinner.json` |
| `pt-stack` | 垂直/水平スタックレイアウト | `stack.json` |
| `pt-surface` | 背景サーフェス | `surface.json` |
| `pt-text` | 本文テキスト（body/label × sm/md/lg） | `text.json` |
| `pt-type-chip` | ポケモンタイプ表示チップ | `type-chip.json` |

### コンポーネント標準チェック

各 `pt-*` コンポーネントは以下が**必須**:
- `pt-{name}.ts` — コンポーネントクラス
- `pt-{name}.spec.ts` — テスト（最低1つの it/test ブロック）
- `projects/docs/src/components/{name}/index.md` — NgDocドキュメント

**検証**: `npm run guard:component-standards`
**ガードレール**: `guards/code-quality/guard/component-standards.guard.md`

---

## 3. デザインガードレール一覧

| ガードレール | @what | 検証コマンド |
|------------|-------|------------|
| `token-naming` | Tier 3トークンのみ使用を強制 | `npm run lint:css` |
| `token-existence` | 使用中のトークンが定義済みか | `npm run guard:token-existence` |
| `space-token-10x` | スペーストークンの10x命名規則 | `npm run guard:space-token-10x` |
| `component-token-mapping` | コンポーネント-トークン対応 | `npm run guard:component-token-mapping` |
| `component-base-styles` | :host の基本スタイル | `npm run guard:component-base-styles` |
| `design-consistency` | CSS品質 | `npm run lint:css` |
| `no-raw-tailwind` | Tailwind直接使用禁止 | `npm run guard:no-raw-tailwind` |

---

## 4. アーキテクチャ

### 3層構造

```
src/app/
├── domain/     # ドメイン層 — 純粋計算・ビジネスロジック
├── core/       # コア層 — 汎用UIコンポーネント・共有サービス
└── features/   # フィーチャー層 — 画面・機能別モジュール

src/app/ui/     # UIコンポーネント（pt-* デザインシステム）
```

### 依存方向（上から下のみ許可）

```
features → core    ✅
features → domain  ✅
core → domain      ✅

core → features    ❌ 禁止（再利用性が失われる）
domain → core      ❌ 禁止（純粋ロジックがUIに依存する）
domain → features  ❌ 禁止
```

**検証**: `npm run dep-check`
**ガードレール**: `guards/architecture/guard/layer-boundaries.guard.md`

### UIインポート規約

`ui/` 配下のコンポーネントはバレルインポート（index.ts）経由でアクセスすること。

**ガードレール**: `guards/architecture/guard/ui-import-standards.guard.md`

---

## 5. 自動生成パイプライン

### tokens:build

```
design-tokens/**/*.json（SSoT）
        │
        ▼  style-dictionary.config.mjs
  生成ファイル:
  ├── src/styles/generated/tokens.css      # CSS カスタムプロパティ
  ├── src/styles/generated/_tokens.scss    # SCSS 変数
  ├── src/design-system/tokens/colors.ts   # TypeScript 型定義
  ├── src/design-system/tokens/components.ts
  ├── src/design-system/tokens/spacing.ts
  ├── src/design-system/tokens/typography.ts
  ├── src/design-system/tokens/effects.ts
  └── src/design-system/tokens/index.ts
        │
        ▼  scripts/generate-types-from-tokens.mjs
  ├── src/app/ui/pt-chip/pt-chip.types.ts  # コンポーネント型
  ├── src/app/ui/pt-icon/pt-icon.types.ts
        │
        ▼  scripts/sync-style-md-tokens.mjs
  └── projects/docs/src/components/*/style.md  # NgDocトークンテーブル
```

**実行**: `npm run tokens:build`
**注意**: JSON を変更したら必ず `tokens:build` を実行すること。
