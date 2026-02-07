# BALTHASAR-2: 母としての判断

> 「このコードは育てやすい（保守しやすい）か？」
> ミサト（作戦部長 / Code Reviewer）とアスカ（弐号機 / Test Guard）が照会するナレッジベース。

---

## 1. コーディング規約

### Angular コンポーネント

```typescript
// ✅ pt-* コンポーネントの基本構造
@Component({
  selector: 'pt-button',
  standalone: true,           // 必須: standalone コンポーネント
  imports: [CommonModule],
  templateUrl: './pt-button.html',  // または template（小さい場合）
  styleUrl: './pt-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,  // 推奨
  host: { ... }
})
export class PtButton {
  // Input/Output は signal-based を推奨
}
```

**ガードレール**: `guards/code-quality/guard/coding-standards.guard.md`

### Angular 制御フロー

新しい制御フロー構文（`@if`, `@for`, `@switch`）を使用すること。
`*ngIf`, `*ngFor` は禁止。

```html
<!-- ❌ 禁止 -->
<div *ngIf="condition">...</div>

<!-- ✅ 必須 -->
@if (condition) {
  <div>...</div>
}
```

**ガードレール**: `guards/code-quality/guard/angular-control-flow.guard.md`

### ファイル構成

```
src/app/ui/pt-{name}/
├── pt-{name}.ts          # コンポーネントクラス（必須）
├── pt-{name}.scss        # スタイル（任意、トークン使用時は必須）
├── pt-{name}.html        # テンプレート（任意、template in class も可）
├── pt-{name}.spec.ts     # テスト（必須）
├── pt-{name}.types.ts    # 型定義（auto-sync対象の場合）
└── index.ts              # バレルエクスポート
```

**ガードレール**: `guards/code-quality/guard/component-structure.guard.md`

---

## 2. SCSS / スタイリング規約

### コンポーネントSCSSの構造

```scss
/**
 * @what コンポーネントのスタイル定義
 * @why デザイントークンとMixinで一貫性を保証
 */

@use 'mixins/common' as mixins;
@use 'mixins/component-base' as base;

:host {
  @include base.host-inline;  // または host-block, host-inline-text
}

.pt-{name} {
  // Layout
  // Typography
  // Colors
  // Transitions
  // Variants
}
```

### :host スタイル

すべての pt-* コンポーネントは `:host` に `base.host-*` mixin を適用すること。

| Mixin | 用途 | 使用例 |
|-------|------|--------|
| `base.host-inline` | inline-flex コンポーネント | button, chip, icon |
| `base.host-block` | block コンポーネント | card, surface, grid |
| `base.host-inline-text` | インラインテキスト | text, heading |

**ガードレール**: `guards/design/guard/component-base-styles.guard.md`

### トークン使用の鉄則

1. **コンポーネントSCSSでは Tier 3 トークンのみ使用**（MELCHIOR参照）
2. **Mixin は `src/styles/mixins/` から**
3. **生のピクセル値やカラーコードは禁止**（トークン経由のみ）

---

## 3. 制約条件（Constraints）

### 全ガードレール一覧

#### アーキテクチャ（2件）
| ガードレール | @what | 検証 |
|------------|-------|------|
| `layer-boundaries` | レイヤー間の依存方向を検査 | `npm run dep-check` |
| `ui-import-standards` | UI コンポーネントのインポート規約 | `npm run guard:ui-import-standards` |

#### コード品質（4件）
| ガードレール | @what | 検証 |
|------------|-------|------|
| `angular-control-flow` | @if/@for/@switch の使用を強制 | `npm run guard:angular-control-flow` |
| `coding-standards` | 一般的なコーディング規約 | `npm run guard:coding-standards` |
| `component-standards` | コンポーネント作成標準（ファイル・ドキュメント・テスト） | `npm run guard:component-standards` |
| `component-structure` | ファイル構成の完全性 | `npm run guard:component-structure` |

#### デザイン（7件）
| ガードレール | @what | 検証 |
|------------|-------|------|
| `component-base-styles` | :host の基本スタイル | `npm run guard:component-base-styles` |
| `component-token-mapping` | コンポーネント-トークン対応 | `npm run guard:component-token-mapping` |
| `design-consistency` | CSS品質 | `npm run lint:css` |
| `no-raw-tailwind` | Tailwind直接使用禁止 | `npm run guard:no-raw-tailwind` |
| `space-token-10x` | 10x命名規則 | `npm run guard:space-token-10x` |
| `token-existence` | トークン存在確認 | `npm run guard:token-existence` |
| `token-naming` | Tier 3 のみ使用 | `npm run lint:css` |

#### 保守（4件）
| ガードレール | @what | 検証 |
|------------|-------|------|
| `cleanliness` | デッドコード禁止 | `npm run guard:cleanliness` |
| `duplication` | 重複コード禁止 | `npm run guard:duplication` |
| `temp-docs` | 一時ドキュメント管理 | `npm run guard:temp-docs` |
| `test-existence` | テスト存在必須 | `npm run guard:test-existence` |

#### プロセス（4件）
| ガードレール | @what | 検証 |
|------------|-------|------|
| `development-workflow` | 開発ワークフロー遵守 | `npm run guard:development-workflow` |
| `issue-format` | Issue形式の検証 | `node scripts/validate-issue-local.js` |
| `post-creation-check` | 作成後チェック | `node scripts/check-issue-warnings.js` |
| `pr-format` | PR形式の検証 | `npm run pr:validate` |

#### その他（4件）
| ガードレール | @what | 検証 |
|------------|-------|------|
| `performance` | パフォーマンス基準 | `npm run guard:performance` |
| `lazy-loading` | 遅延ロード強制 | `npm run guard:lazy-loading` |
| `analytics` | トラッキング強制 | `npm run guard:analytics` |
| `guardrail-format` | ガードレール自体の形式 | `npm run guard:guardrail-format` |

### 一括検証

```bash
npm run guards:validate    # 全ガードレール一括実行
```

---

## 4. テスト要件

### 最低要件

- 各 `pt-*.spec.ts` に最低1つの `it()` / `test()` ブロック
- テストフレームワーク: Vitest
- 実行: `npm test`

### テスト構造

```typescript
import { describe, it, expect } from 'vitest';

describe('PtButton', () => {
  it('should create', () => {
    // コンポーネント生成テスト
  });

  it('should render with default variant', () => {
    // デフォルトバリアントのテスト
  });
});
```

**ガードレール**: `guards/maintenance/guard/test-existence.guard.md`

---

## 5. @what / @why / @failure パターン（全ファイル共通）

すべてのガードレール・ルールファイルには以下のコメントを**必ず**付与する:

```
@what  何を検査するか（1行で）
@why   なぜこの検査が必要か（理由）
@failure  違反時にどうなるか（結果）
```

**目的**: AIに意図を伝えるためのコメント。
これがないとAIは「とりあえず通るように」修正してしまい、ルールの意図が骨抜きになる。

**ガードレール**: `guards/meta/guard/guardrail-format.guard.md`
