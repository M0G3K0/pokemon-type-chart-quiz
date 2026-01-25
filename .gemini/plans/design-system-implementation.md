# チE��インシスチE��実裁E��画

**Issue**: #6 - ✨ feat: establish design system with tokens and docs
**ブランチE*: `feat/design-system` (βブランチ、E��朁E

---

## 🎯 ゴール

1. **AI時代に最適化されたチE��イント�Eクン** - 3層構造、メタチE�Eタ記述、Style Dictionary
2. **自己完結型コンポ�EネンチE* - バリエーションをコンポ�Eネント�Eに閉じ込め、定義外�E使用を禁止
3. **NgDocによるドキュメントサイチE* - API仕様、ガイド、Playground�E�EitHub Pagesで別チE�Eロイ�E�E
4. **ガードレールによる強制** - チE��インルール違反を�E動検�E、CIで弾ぁE

### 🎯 ベンチ�Eーク

| シスチE�� | 学ぶべき点 |
|---------|-----------|
| **[Atlassian Design System](https://atlassian.design)** | ドキュメント体系、トークン構造 |
| **[Salesforce Lightning](https://lightningdesignsystem.com)** | C-TI命名規則�E�Eategory-Type-Item�E�E|
| **[Shopify Polaris](https://polaris.shopify.com)** | 意図�E�Entent�E��E言語化 |
| **[Adobe Spectrum](https://spectrum.adobe.com)** | クロスプラチE��フォーム対忁E|

---

## 🏗�E�EAI時代のト�Eクン設計原剁E

### 3層構造�E�Eier System�E�E

| 階層 | 名称 | 役割 | AIへの影響 | 侁E|
|------|------|------|-----------|-----|
| **Tier 1** | Primitive Tokens | 生�E値の保管庫 | AIには直接使わせなぁE| `blue-500`, `space-4` |
| **Tier 2** | Semantic Tokens | 使用目皁E�E斁E��を定義 | **AIが参照する層** | `bg-surface-critical`, `text-action-primary` |
| **Tier 3** | Component Tokens | コンポ�Eネント固有�E値 | 例外的に使用 | `btn-primary-bg`, `card-padding-x` |

### AI最適化�Eための命名規則

```
Category - Property - Concept - State
```

| 悪ぁE��E| 良ぁE��E| 琁E�� |
|--------|--------|------|
| `text-red` | `text-feedback-error-hover` | 色の事実だけでなく「いつ使ぁE��」が明確 |
| `shadow-xl` | `shadow-elevation-modal` | 用途が明確 |

### メタチE�Eタ記述�E�EIへのガードレール�E�E

```json
{
  "color": {
    "surface": {
      "critical": {
        "value": "{color.red.100}",
        "type": "color",
        "description": "【利用条件】ユーザーの操作により不可送E��なチE�Eタ損失が発生する警告�E背景色。テキスト色としては使用不可、E
      }
    }
  }
}
```

### チE�Eルチェーン

```
design-tokens.json (SSOT)
    ↁEStyle Dictionary
├── tokens.css (CSS Variables)
├── tokens.ts (TypeScript定数)
└── tokens.d.ts (型定義 ↁEリンターで非定義ト�Eクンを弾ぁE
```

---

## 📊 進捗状況E

### ✁E完亁E

- [x] Phase 0: NgDoc調査 ↁEGitHub Pages方式に変更�E�本体と刁E���E�E
- [x] Phase 1 (部刁E: ト�EクンファイルめEカチE��リに刁E��
  - colors, typography, spacing, border, elevation, sizing, motion, z-index

### 🚧 追加タスク�E�EI最適化！E

Phase 1の前に以下を実施�E�E

- [ ] Style Dictionary導�E
- [ ] ト�EクンをJSONで再定義�E�E層構造�E�E
- [ ] 命名規則の見直し！Eategory-Property-Concept-State�E�E
- [ ] TypeScript型定義の自動生戁E

---

## 🧩 コンポ�Eネント設計方釁E

### 原則�E��E己完結型コンポ�EネンチE

```html
<!-- ✁E正しい使ぁE�� -->
<pt-button variant="primary" size="md">送信</pt-button>

<!-- ❁E禁止パターン -->
<pt-button class="shadow-xl">...</pt-button>  <!-- 外部クラス禁止 -->
<pt-button style="padding: 20px">...</pt-button>  <!-- インラインスタイル禁止 -->
```

### コンポ�Eネントセレクタ

プロジェクト固有�EプレフィチE��ス `pt-` を使用、E

---

## 📋 フェーズ刁E���E�更新版！E

### Phase 1: ト�Eクン基盤�E�Etyle Dictionary導�E�E�E
**ブランチE*: `feat/design-system/tokens`

| タスク | 詳細 |
|--------|------|
| Style Dictionary導�E | JSONベ�Eスのト�Eクン管琁E|
| 3層構造でト�Eクン再定義 | Primitive ↁESemantic ↁEComponent |
| 命名規則統一 | `Category-Property-Concept-State` |
| TypeScript型生戁E| 非定義ト�Eクンをリンターで弾ぁE|
| ガードレール追加 | `guards/design/token-usage.guard.md` |

### Phase 2: レイアウトコンポ�EネンチE
**ブランチE*: `feat/design-system/layout`

| コンポ�EネンチE| 役割 |
|---------------|------|
| `<pt-stack>` | 縦並び�E�Eap制御�E�E|
| `<pt-cluster>` | 横並び�E�Eap制御�E�E|
| `<pt-center>` | 中央寁E�� |
| `<pt-box>` | padding/margin制御 |

### Phase 3: Atomsリファクタリング
**ブランチE*: `feat/design-system/atoms`

- `app-button` ↁE`pt-button`
- `app-badge` ↁE`pt-badge`
- `app-card` ↁE`pt-card`

### Phase 4: ガードレール追加
**ブランチE*: `feat/design-system/guards`

| ガードレール | 検査冁E�� |
|-------------|---------|
| `no-raw-tailwind` | TailwindユーチE��リチE��直接使用禁止 |
| `use-design-tokens` | ハ�Eドコード禁止 |
| `no-inline-styles` | style属性禁止 |
| `token-type-check` | 非定義ト�Eクンの使用を型エラーで検�E |

### Phase 5: ドキュメント整備！EgDoc on GitHub Pages�E�E
**ブランチE*: `feat/design-system/docs`

| タスク | 詳細 |
|--------|------|
| `/docs` プロジェクト作�E | Angular + NgDoc |
| GitHub Actions設宁E| GitHub Pagesへ自動デプロイ |
| 吁E��ークンのドキュメンチE| 利用条件、Anti-patterns含む |
| コンポ�EネンチElayground | 吁E��ンポ�Eネント�E対話皁E��モ |

---

## 🔄 ブランチ戦略

```
main
  └── feat/design-system (βブランチE
        ├── feat/design-system/tokens    ↁE次
        ├── feat/design-system/layout
        ├── feat/design-system/atoms
        ├── feat/design-system/guards
        └── feat/design-system/docs
```

吁E��ィーチャーブランチ�E `feat/design-system` にマ�Eジ、E
全体完�E後、`feat/design-system` めE`main` にマ�Eジ、E

---

## ✁E完亁E��件

- [ ] ト�EクンがStyle Dictionaryで管琁E��れてぁE��
- [ ] ト�Eクン命名が3層構造に従ってぁE��
- [ ] TypeScript型定義が�E動生成されてぁE��
- [ ] 非定義ト�Eクン使用がCIで弾かれめE
- [ ] NgDocドキュメントサイトがGitHub PagesにチE�EロイされてぁE��
- [ ] 既存コンポ�Eネントがリファクタリング済み
- [ ] ガードレールがCIで動作してぁE��

---

## 📝 次のアクション

1. ✁Eこ�E計画をレビュー
2. Phase 1�E�Eokens-v2�E�用のブランチを刁E��
3. Style Dictionaryを導�E
4. design-tokens.jsonを作�E
