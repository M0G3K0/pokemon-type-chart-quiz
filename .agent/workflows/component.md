---
description: コンポーネント実装のE2Eワークフロー（設計〜PR作成まで）
---

# コンポーネント実装・修正ワークフロー

このワークフローは `/component` コマンドで呼び出されます。
新規作成・修正の両方に対応します。

## 🚨 重要なルール

- **既存コンポーネント・ドキュメントを踏襲すること**: 新たに作る場合は既存の類似コンポーネントを手本にする
- **Design Tokensを必ず使用する**: ハードコード値は禁止
- **types.ts は自動生成**: `npm run tokens:build` で生成される。手動で編集しない
- **style.md のトークンテーブルはマーカーで自動同期**: 手動でトークン値を書かない
- **ドキュメントは `/component-doc` ワークフローに従う**

---

## ファイル構成

### コンポーネント本体（4点セット + types）

```
src/app/ui/pt-{name}/
├── pt-{name}.ts          # Component class
├── pt-{name}.html        # Template
├── pt-{name}.scss        # Styles (Design Tokens使用)
├── pt-{name}.spec.ts     # Unit tests
├── pt-{name}.types.ts    # 🤖 自動生成（tokens:buildで生成）
└── index.ts              # Public API（export）
```

### トークン定義

```
design-tokens/tier3-component/{name}.json
```

### NgDocドキュメント

```
projects/docs/src/components/{name}/
├── ng-doc.page.ts
├── index.md              # Guidelines
├── examples.md           # Examples
├── style.md              # Style（トークンテーブルは自動同期）
├── api.md                # API
└── demos/
    ├── *-demo.component.ts
    └── playground.component.ts
```

---

## Step 0: MAGI照会（必須）🔺

**作業開始前に以下を必ず読むこと:**

// turbo
```bash
cat MAGI/MELCHIOR.md
```
// turbo
```bash
cat MAGI/BALTHASAR.md
```

特に確認すべき点:
- **MELCHIOR**: トークン階層（Tier 3のみ使用）、コンポーネントカタログ、自動生成パイプライン
- **BALTHASAR**: SCSS規約、:host mixin、全ガードレール制約

> リツコ: 「MAGIに照会したわ。この知識なしに出撃するのは許可しない。」

---

## Step 1: 事前確認

### 新規作成の場合

1. **既存コンポーネントの調査**: 類似コンポーネントのコード・ドキュメントを確認する
   ```bash
   # 既存コンポーネント一覧
   ls src/app/ui/
   ```

2. **ベンチマーク調査**: 以下のデザインシステムを参考にする

   | 名前 | URL | 特徴 |
   |------|-----|------|
   | Material Design 3 | https://m3.material.io/components | Google標準、包括的 |
   | GitHub Primer | https://primer.style/components | シンプル、開発者向け |
   | SmartHR | https://smarthr.design/products/components/ | 日本語、BtoB向け |

   調査ポイント:
   - [ ] **命名**: コンポーネント名、Props名の慣習
   - [ ] **Props**: 必須/任意、型、デフォルト値
   - [ ] **バリアント**: サイズ、色、状態
   - [ ] **アクセシビリティ**: ARIA属性、キーボード操作

### 修正の場合

1. **対象コンポーネントの現状を確認**:
   ```bash
   # コンポーネントファイル
   ls src/app/ui/pt-{name}/
   # トークン定義
   cat design-tokens/tier3-component/{name}.json
   # NgDocドキュメント
   ls projects/docs/src/components/{name}/
   ```

2. **影響範囲の確認**: 変更箇所を使用している他ファイルを検索
   ```bash
   grep -r "pt-{name}" src/ --include="*.ts" --include="*.html" -l
   ```

---

## Step 2: トークン定義

### 新規作成の場合

`design-tokens/tier3-component/{name}.json` を作成する。

**既存のトークンファイルを手本にすること！**（例: `chip.json`, `icon.json`）

```json
{
  "$description": "Tier 3: {Name} Component Tokens.",
  "{name}": {
    "$description": "コンポーネントの説明。",
    "size": {
      "sm": {
        "value": "{space.40}",
        "type": "sizing",
        "$description": "小サイズ (16px)。用途の説明。"
      }
    }
  }
}
```

**ルール:**
- `$description` は必ず付ける（値と用途を含める）
- 参照は `{space.40}` のようなセマンティックトークンを使用
- Primitiveトークンを直接参照しない（Stylelintで検出される）

### 修正の場合

`design-tokens/tier3-component/{name}.json` を直接編集する。

---

## Step 3: トークンビルド

// turbo
```bash
npm run tokens:build
```

これにより以下が自動生成・更新される:
- `src/styles/generated/tokens.css` — CSS変数
- `src/styles/generated/_tokens.scss` — SCSS変数
- `src/design-system/tokens/*.ts` — TypeScriptトークン定数
- `src/app/ui/pt-{name}/pt-{name}.types.ts` — **コンポーネントバリアント型**（設定済みの場合）
- `projects/docs/src/components/{name}/style.md` — **トークンテーブル**（マーカー設定済みの場合）

### 自動生成の設定（新規コンポーネントの場合）

#### types.ts 自動生成の追加

`scripts/generate-types-from-tokens.mjs` の `COMPONENT_CONFIGS` に設定を追加:

```javascript
{
  tokenFile: '{name}.json',
  outputFile: 'src/app/ui/pt-{name}/pt-{name}.types.ts',
  rootKey: '{name}',
  variants: [
    {
      tokenPath: 'size',         // トークンJSON内のパス
      typeName: '{Name}Size',    // 生成する型名
      constName: '{NAME}_SIZES', // 生成するconst名
    },
  ],
}
```

#### style.md トークンテーブル自動同期の追加

`scripts/sync-style-md-tokens.mjs` の `COMPONENT_TABLE_CONFIGS` に設定を追加:

```javascript
{name}: {
  tokenFile: '{name}.json',
  rootKey: '{name}',
  docsDir: '{name}',
  tables: [
    {
      id: 'size',
      title: '### Size',
      tokenPath: 'size',
      columns: ['Size', 'Token (Tier 3)', 'Value', '用途'],
      rowMapper: (key, token) => {
        const px = extractPxFromDesc(token);
        const usage = extractUsageFromDesc(token);
        return `| \`${key}\` | ${cssVar('{name}', 'size', key)} | ${px} | ${usage} |`;
      },
    },
  ],
},
```

---

## Step 4: コンポーネント実装

### 新規作成の場合

既存コンポーネントを手本に4点セットを作成する。

**参考にすべきコンポーネント:**

| パターン | 手本 | 特徴 |
|----------|------|------|
| シンプルな表示系 | `pt-chip`, `pt-text` | サイズ・バリアント |
| アイコン系 | `pt-icon`, `pt-avatar` | アセットパス解決 |
| インタラクティブ系 | `pt-button`, `pt-radio-button` | イベント・状態管理 |
| レイアウト系 | `pt-stack`, `pt-grid` | CSS Grid/Flexbox |

#### SCSS実装ルール（⚠️ ガードレール準拠）

コンポーネントのSCSSでは **自身のコンポーネントトークン（Tier 3）のみ** を使用する。
Tier 1（Primitive）・Tier 2（Semantic）の直接使用はどちらも禁止。

> **理由**: Tier 3のみに統一することで、NgDocドキュメントをトークンJSONから自動生成できる。
> Tier 2を混在させると、手動で管理する項目が残り、Single Source of Truthが崩れる。

```scss
// ✅ Good: 自身のコンポーネントトークン（Tier 3）のみ使用
:host {
  padding: var(--pt-chip-padding-x-sm);
  font-size: var(--pt-chip-font-size-sm);
  border-radius: var(--pt-chip-radius-md);
  gap: var(--pt-chip-gap);
}

// ❌ Bad: Semanticトークン（Tier 2）を直接使用
:host {
  padding: var(--pt-spacing-content-sm);    // → Tier 3に定義すべき
  font-size: var(--pt-font-size-sm);        // → Tier 3に定義すべき
  border-radius: var(--pt-semantic-border-radius-md); // → Tier 3に定義すべき
}

// ❌ Bad: Primitiveトークン（Tier 1）を直接使用
:host {
  padding: var(--pt-space-10);
  color: var(--pt-color-gray-800);
}
```

**トークン階層（SCSSが参照できるのはTier 3のみ）:**
```
Tier 1 (Primitive)  →  Tier 2 (Semantic)  →  Tier 3 (Component)  →  SCSS
  --pt-space-10         --pt-spacing-*         --pt-chip-*          var(--pt-chip-*)
  --pt-color-gray-*     --pt-color-text-*      --pt-button-*        var(--pt-button-*)
                        --pt-font-size-*       (ここに定義)          (ここだけ参照)
```

必要なコンポーネントトークンが存在しない場合は、まず `design-tokens/tier3-component/{name}.json` にトークンを追加する。

> 📖 詳細: `guards/design/guard/token-naming.guard.md`

#### TypeScriptのInput型

`types.ts` は自動生成されるので、それをインポートして使用:

```typescript
import { {Name}Size, {Name}Rounded } from './pt-{name}.types';

@Input() size: {Name}Size = 'md';
@Input() rounded: {Name}Rounded = 'md';
```

### 修正の場合

- 修正対象のファイルを編集する
- **types.ts は手動で編集しない**（トークンJSONの変更で自動更新される）

---

## Step 5: テスト

既存のテストファイルを手本に `pt-{name}.spec.ts` を作成/更新する。

**テスト観点:**
- [ ] デフォルト状態の描画
- [ ] 各Props/Inputの反映
- [ ] バリアント切り替え
- [ ] クラス名の出力（`host-binding`）
- [ ] Edge case（未定義値、空値）

---

## Step 6: ドキュメント作成・更新

**`/component-doc` ワークフローに従うこと！**

```
/component-doc
```

**重要ポイント:**
- style.md のトークンテーブル部分にはマーカーを使用する
- トークン値は手動で書かない（`npm run tokens:build` で自動更新される）
- マーカーの形式: `<!-- @auto-generated:{id}:start -->` / `<!-- @auto-generated:{id}:end -->`

---

## Step 7: 出撃シーケンス（検証）🔺

> 冬月: 「エヴァ初号機、発進準備に入れ」

### 🔬 リツコ（デザイン整合性チェック）

// turbo
```bash
npm run lint:css
```

> リツコ: 「MAGIに照会……デザイントークン整合性、問題なし / **パターン青！使徒です！**」

### 🎖️ ミサト（コード品質チェック）

// turbo
```bash
npm run lint
```

> ミサト: 「コード品質確認完了 / **ちょっと待って。この実装、作戦に問題があるわ。**」

### 🔥 アスカ（テスト）

// turbo
```bash
npm test
```

> アスカ: 「全テストパス……しょうがないわね、認めてあげる / **あんたバカぁ！？テストが足りないのよ！！**」

### 🏗️ ビルド確認

// turbo
```bash
npm run build
```

### 🛡️ 全ガードレール一括検証

// turbo
```bash
npm run guards:validate
```

### 発進判定

```
全チェック結果を確認:

✅ リツコ:  デザイン整合性 ───── 問題なし
✅ ミサト:  コード品質 ────── 確認完了
✅ アスカ:  テスト ──────── 全パス
✅ ビルド:  コンパイル ───── 成功
✅ ガード:  全ガードレール ── 通過

→ 全チェック通過の場合:
  冬月: 「全チェック完了。発進可能状態です」
  ミサト: 「エヴァ初号機、発進！！！🔺」
  → Step 8 へ進む

→ いずれか失敗の場合:
  冬月: 「シンクロ率低下！発進中止！」
  → 該当箇所を修正し、出撃シーケンスを再実行
```

---

## Step 8: コミット & プッシュ

```bash
# 新規作成
git add src/app/ui/pt-{name}/ design-tokens/tier3-component/{name}.json projects/docs/src/components/{name}/ scripts/
git commit -m "feat(ui): add pt-{name} component with docs"

# 修正
git add <changed-files>
git commit -m "fix(ui): update pt-{name} token definitions"
```

---

## Step 9: PR作成

**`/pr` ワークフローに従うこと！**

```
/pr
```

---

## クイックリファレンス

| ステップ | 新規作成 | 修正 |
|----------|---------|------|
| 事前確認 | 既存コンポーネント調査 + ベンチマーク | 現状・影響範囲確認 |
| トークン定義 | `tier3-component/{name}.json` 作成 | `{name}.json` 編集 |
| トークンビルド | `npm run tokens:build` | `npm run tokens:build` |
| 自動生成設定 | scripts の CONFIGS に追加 | 不要（既存設定で自動更新） |
| 実装 | 4点セット作成（既存を手本に） | 対象ファイル編集 |
| テスト | spec.ts 作成 | spec.ts 更新 |
| ドキュメント | `/component-doc` | `/component-doc` で更新 |
| 検証 | lint + test + build + guards | lint + test + build + guards |
| PR作成 | `/pr` | `/pr` |

---

## 参照

| 内容 | ファイル |
|------|----------|
| ドキュメント作成ワークフロー | `.agent/workflows/component-doc.md` |
| PR作成ワークフロー | `.agent/workflows/pr.md` |
| トークンビルド設定 | `style-dictionary.config.mjs` |
| types.ts 自動生成設定 | `scripts/generate-types-from-tokens.mjs` |
| style.md 自動同期設定 | `scripts/sync-style-md-tokens.mjs` |
| ガードレール一覧 | `guards/README.md` |
| 既存コンポーネント | `src/app/ui/` |
| トークン定義 | `design-tokens/tier3-component/` |
