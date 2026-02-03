---
description: コンポーネントドキュメント作成ワークフロー（NgDoc 4タブ構成）
---

# コンポーネントドキュメント作成ワークフロー

このワークフローは、NgDocを使用してUIコンポーネントのドキュメントを作成する手順を定義します。

## 前提条件

- NgDocがセットアップ済み（`projects/docs`）
- 対象コンポーネントが実装済み
- コンポーネントトークン（`design-tokens/tier3-component/[component].json`）が存在することを確認

## ディレクトリ構成

```
projects/docs/src/components/
└── [component-name]/
    ├── ng-doc.page.ts        # ページ設定（タブ・デモ・Playground定義）
    ├── index.md              # Guidelines タブ（デフォルト）
    ├── examples.md           # Examples タブ
    ├── style.md              # Style タブ
    ├── api.md                # API タブ
    └── demos/                # デモコンポーネント格納
        ├── [xxx]-demo.component.ts         # バリエーション表示の型
        ├── sizes-demo.component.ts       # （サイズバリエーションの例）
        ├── [variant]-demo.component.ts   # （その他バリエーションもすべて含める）
        └── playground.component.ts       # Playground用ラッパー
```

---

## Step 1: 事前確認

### 1.1 コンポーネントトークンの存在確認

```bash
ls design-tokens/tier3-component/ | grep [component]
```

**トークンが存在しない場合**: Issue を作成して先にトークンを定義するか、既存のセマンティックトークンで代替（その場合Issueで記録）

### 1.2 型定義ファイルの確認

コンポーネントに `.types.ts` ファイルが存在し、バリエーション定数がエクスポートされているか確認：

```typescript
// src/app/ui/pt-[component]/pt-[component].types.ts
export const CHIP_SIZES = ['sm', 'md', 'lg'] as const;
export type ChipSize = (typeof CHIP_SIZES)[number];
```

**存在しない場合**: 作成してバリエーション定数をエクスポート

### 1.3 元ドキュメントの確認

`docs/components/pt-[component].md` に既存ドキュメントがあれば内容を参照

### 1.4 依存アセットの確認

コンポーネントがアイコンなどのアセットを使用する場合、`angular.json` の `docs` プロジェクトで正しく参照されているか確認：

```json
// angular.json > projects > docs > architect > build > options > assets
{
  "glob": "**/*",
  "input": "public/icons",
  "output": "/icons"
}
```

**アセットが見つからない場合（404）**: `angular.json` に上記のような設定を追加

### 1.5 パスエイリアスの使用

ドキュメントコンポーネントからメインアプリのコードをインポートする際は、パスエイリアスを使用：

```typescript
// ❌ 相対パスは深くなりすぎて保守が困難
import { Component } from '../../../../../../src/app/ui/pt-chip/pt-chip';

// ✅ パスエイリアスで簡潔に
import { Component } from '@ui/pt-chip/pt-chip';
import { POKEMON_TYPES } from '@domain/type-chart';
```

**利用可能なエイリアス** (`tsconfig.json` で定義):
- `@app/*` → `./src/app/*`
- `@ui/*` → `./src/app/ui/*`
- `@domain/*` → `./src/app/domain/*`

### 1.6 アセットパスの動的解決（重要）

GitHub Pagesなどサブパスでホストされる環境では、アイコンなどのアセットパスを動的に解決する必要があります。

**ハードコードされたパスは使用禁止**:

```typescript
// ❌ ハードコード（GitHub Pagesで404になる）
get iconPath(): string {
  return `/icons/${this.type}.svg`;
}

// ✅ AssetPathService を使用（base href を考慮）
import { AssetPathService } from '@app/core/services/asset-path.service';

private readonly assetPath = inject(AssetPathService);

get iconPath(): string {
  return this.assetPath.icon(this.type);  // → '/pokemon-type-chart-quiz/icons/fire.svg'
}
```

**AssetPathService のAPI**:
- `resolve(path)`: 任意のパスを解決（例: `resolve('/assets/image.png')`）
- `icon(name)`: アイコンパスを解決（例: `icon('fire')` → `/icons/fire.svg`）

**テンプレートでの使用**:

```html
<!-- コンポーネントのゲッターを通じて使用 -->
<pt-icon [src]="iconPath"></pt-icon>
```

---

## Step 2: カテゴリ作成（初回のみ）

`projects/docs/src/components/ng-doc.category.ts` を作成：

```typescript
import { NgDocCategory } from '@ng-doc/core';

const ComponentsCategory: NgDocCategory = {
  title: 'Components',
};

export default ComponentsCategory;
```

---

## Step 3: ページ設定ファイル作成

`projects/docs/src/components/[component-name]/ng-doc.page.ts` を作成：

```typescript
import { NgDocPage } from '@ng-doc/core';
import ComponentsCategory from '../ng-doc.category';
// デモコンポーネントをインポート
import { AllTypesDemoComponent } from './demos/all-types-demo.component';
import { SizesDemoComponent } from './demos/sizes-demo.component';
import { PlaygroundComponent } from './demos/playground.component';

const ComponentNamePage: NgDocPage = {
  title: '[ComponentName]',
  category: ComponentsCategory,
  mdFile: [
    './index.md',       // Guidelines（デフォルトタブ）
    './examples.md',    // Examples
    './style.md',       // Style
    './api.md',         // API
  ],
  // デモコンポーネント登録
  demos: {
    TypesDemoComponent,
    SizesDemoComponent,
  },
  // Playground登録
  playgrounds: {
    ComponentPlayground: {
      target: PlaygroundComponent,
      template: `<ng-doc-selector></ng-doc-selector>`,
    },
  },
};

export default ComponentNamePage;
```

---

## Step 4: デモコンポーネント作成

### 4.1 基本ルール

1. **ハードコードを避ける**: `.types.ts` からエクスポートされた定数を使用
2. **forループで表示**: バリエーションは `@for` で動的に生成
3. **1デモ = 1観点**: サイズ、形状、コンテンツバリエーションは別デモに分離
4. **差分を最小化**: 観察対象以外のプロパティは固定値

### 4.2 サンプル: バリエーション表示

```typescript
// demos/types-demo.component.ts
import { Component } from '@angular/core';
import { ComponentName } from '@ui/pt-[component]/pt-[component]';
import { VARIANTS, VARIANTS_MAP } from '@domain/[domain]';

@Component({
  selector: '[component]-types-demo',
  standalone: true,
  imports: [ComponentName],
  template: `
    @for (variant of variants; track variant) {
      <pt-[component] [variant]="variant" [showIcon]="true">
        {{ getLabel(variant) }}
      </pt-[component]>
    }
  `,
})
export class TypesDemoComponent {
  readonly variants = VARIANTS;
  
  getLabel(variant: string): string {
    return VARIANTS_MAP[variant];
  }
}
```

### 4.3 サンプル: サイズバリエーション

```typescript
// demos/sizes-demo.component.ts
import { Component } from '@angular/core';
import { ComponentName } from '@ui/pt-[component]/pt-[component]';
import { COMPONENT_SIZES, ComponentSize } from '@ui/pt-[component]/pt-[component].types';

@Component({
  selector: '[component]-sizes-demo',
  standalone: true,
  imports: [ComponentName],
  template: `
    @for (size of sizes; track size) {
      <pt-[component] variant="default" [size]="size">ラベル</pt-[component]>
    }
  `,
})
export class SizesDemoComponent {
  readonly sizes: ComponentSize[] = COMPONENT_SIZES;
}
```

### 4.4 Playgroundコンポーネント

**重要**: Playgroundは元コンポーネントをラップした専用コンポーネントを作成

```typescript
// demos/playground.component.ts
import { Component, Input } from '@angular/core';
import { ComponentName } from '@ui/pt-[component]/pt-[component]';
import { VARIANTS_MAP } from '@domain/[domain]';

@Component({
  selector: '[component]-playground',
  standalone: true,
  imports: [ComponentName],
  template: `
    <pt-[component] 
      [variant]="variant" 
      [size]="size" 
      [showIcon]="showIcon">
      {{ getLabel() }}
    </pt-[component]>
  `,
})
export class PlaygroundComponent {
  // 必要なInputのみ公開（型をリテラルで明示するとNgDocがドロップダウン生成）
  @Input() variant: 'type1' | 'type2' | 'type3' = 'type1';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showIcon = true;
  
  // 不要なInput（textColorなど）は公開しない
  
  // ラベルは自動取得（Inputにしない）
  getLabel(): string {
    return VARIANTS_MAP[this.variant] || this.variant;
  }
}
```

---

## Step 5: Guidelines タブ（index.md）

**重要**: バリアント選択ガイドは必須です。「どのバリアント/オプションをいつ使うか」を明確にしないと、実装時に揺れが発生します。

```markdown
---
title: Guidelines
---

> [1行の説明文]

## Overview
[コンポーネントの概要を2-3文で説明。ベンチマーク参照は不要]

## When to Use ✅

| シチュエーション | 説明 |
|------------------|------|
| **[ユースケース1]** | [説明] |
| **[ユースケース2]** | [説明] |

## When NOT to Use ❌

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **[パターン1]** | [理由] | `[代替コンポーネント]`を使用 |

---

## [Variant/Option] 選択ガイド（必須）

**各バリアント/オプションについて「使用する場面」「使用しない場面」を記載**

### [Variant1]

**使用する場面:**
- [具体的なユースケース1]
- [具体的なユースケース2]

**使用しない場面:**
- [避けるべきケース]

```html
<!-- ✅ 良い例 -->
<pt-[component] variant="variant1">...</pt-[component]>

<!-- ❌ 悪い例 -->
<pt-[component] variant="variant1">（この使い方は避ける）</pt-[component]>
```

### [Variant2]

**使用する場面:**
- [具体的なユースケース]

**使用しない場面:**
- [避けるべきケース]

---

## [Size/Other Option] 選択ガイド

| サイズ | 用途 |
|--------|------|
| `sm` | [用途] |
| `md` | [用途]（デフォルト） |
| `lg` | [用途] |

---

## [関連コンポーネント]との使い分け（該当する場合）

| 判断基準 | 選択 |
|----------|------|
| [基準1] | `pt-[component]` |
| [基準2] | `pt-[related]` |

---

## Architecture（オプション）

[コンポーネントの階層構造がある場合のみ記載]

```
pt-[component] (Organism - Wrapper)
  └── pt-[base] (Molecule)
```
```

---

## Step 6: Examples タブ（examples.md）

```markdown
---
title: Examples
route: examples
---

## All [Variants]

[全バリエーションを一覧表示]:

{{ NgDocActions.demo("AllTypesDemoComponent") }}

## Sizes

サイズバリエーション（sm / md / lg）：

{{ NgDocActions.demo("SizesDemoComponent") }}

## [Other Variants]

[他のバリエーション]:

{{ NgDocActions.demo("OtherDemoComponent") }}
```

---

## Step 7: Style タブ（style.md）

**重要**: 省略せず、全トークンを記載

```markdown
---
title: Style
route: style
---

## Design Tokens

`pt-[component]`は以下のデザイントークンを使用します。

### [Category 1]

| Visual Attribute | Token (Tier 2/3) | Primitive Value |
|-----------------|------------------|-----------------|
| [属性1] | `--pt-[token-name]` | `#HEXCODE` |
| [属性2] | `--pt-[token-name]` | `#HEXCODE` |
| [属性3] | `--pt-[token-name]` | `#HEXCODE` |
[省略せず全て記載]

### Text Color

| Visual Attribute | Token | Primitive Value |
|-----------------|-------|-----------------|
| テキスト色 | `--pt-color-text-inverse` | `#FFFFFF` |

---

## Layout Specifications

| Size | Height | Padding | Gap | Font Size |
|------|--------|---------|-----|-----------|
| `sm` | 24px | 8px | 4px | 12px |
| `md` | 32px | 12px | 6px | 14px |
| `lg` | 40px | 16px | 8px | 16px |

---

## Border Radius

| Rounded | Value |
|---------|-------|
| `none` | 0 |
| `sm` | 4px |
| `md` | 8px |
| `full` | 9999px |

---

## Related Tokens

- `[関連コンポーネント]`: [参照理由]
- `design-tokens/tier2-semantic/[file].json`: [トークン定義場所]
```

---

## Step 8: API タブ（api.md）

```markdown
---
title: API
route: api
---

## Playground

{{ NgDocActions.playground("ComponentPlayground") }}

---

## API Reference

{{ NgDocApi.api("src/app/ui/pt-[component]/pt-[component].ts#ComponentName") }}

---

## Details

{{ NgDocApi.details("src/app/ui/pt-[component]/pt-[component].ts#ComponentName") }}

---

## [Type Definitions]（オプション）

[特殊な型定義がある場合のみ記載]

```typescript
type VariantType = 'type1' | 'type2' | ...;
```

---

## Related

- `pt-[related]`: [関連コンポーネント説明]
```

---

## Step 9: グローバルスタイル確認

`projects/docs/src/styles.scss` に以下が含まれていることを確認：

```scss
/* Design Tokens */
@import "../../../src/styles/generated/tokens.css";

/* Demo共通スタイル */
.ng-doc-demo > * {
  display: flex;
  gap: var(--pt-space-3);
  align-items: center;
  flex-wrap: wrap;
}
```

---

## Step 10: 動作確認

// turbo
```bash
rm -rf ng-doc && ng serve docs --port 4300
```

ブラウザで `http://localhost:4300/components/[component-name]` を開いて確認：

- [ ] 4タブ全て表示される
- [ ] Examplesのデモが正しく表示される
- [ ] Playgroundでプロパティ変更が反映される
- [ ] API Referenceが自動生成される

---

## Step 11: コミット

```bash
git add projects/docs/src/components/[component-name]
git commit -m "docs([component-name]): add component documentation"
```

---

## チェックリスト

### 事前準備
- [ ] コンポーネントトークン（tier3-component/[component].json）が存在する
- [ ] .types.ts にバリエーション定数がエクスポートされている

### Guidelines
- [ ] Overview が記載されている
- [ ] When to Use / When NOT to Use が表形式で記載されている
- [ ] **バリアント選択ガイドが記載されている**（各バリアントの「使用する場面」「使用しない場面」）
- [ ] **関連コンポーネントとの使い分けが記載されている**（該当する場合）
- [ ] ベンチマーク参照は含まない

### Examples
- [ ] 全バリエーションのデモがある
- [ ] デモはforループで動的生成（ハードコードしない）
- [ ] 1デモ = 1観点（サイズ、形状などは分離）

### Style
- [ ] 全トークンが省略なしで記載されている
- [ ] Token名とPrimitive値が並んで記載されている
- [ ] Layout Specifications（サイズ別）が記載されている
- [ ] アイコン命名規則は含まない（アイコンコンポーネントの責務）

### API
- [ ] Playgroundが動作する
- [ ] Playground用ラッパーコンポーネントを使用（必要なInputのみ公開）
- [ ] NgDocApi.api() / NgDocApi.details() でAPI自動生成
- [ ] 不要なInput（textColorなど）はPlaygroundに表示されない

### 全体
- [ ] `ng serve docs` でエラーなく表示される
- [ ] 見出しは英語、本文は日本語