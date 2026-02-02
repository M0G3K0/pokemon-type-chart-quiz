---
title: pt-icon color プロパティ追加
status: in-progress
created: 2026-02-03
task: "pt-icon コンポーネントに color プロパティを追加し、タイプカラーでアイコンを着色できるようにする"
---

# pt-icon color プロパティ追加 実装計画

## 概要

`pt-icon` コンポーネントに `color` プロパティを追加し、タイプ名（`fire`, `water` など）または `inverse` を渡すことでアイコンを着色できるようにする。

### 背景

- SVG アイコンが白色（`fill: #fff`）で統一された
- 現状では背景色がないとアイコンが見えない
- 一般的なデザインシステムでは、アイコンに色を渡せるのが標準

### ゴール

```html
<!-- タイプカラーで着色 -->
<pt-icon src="fire.svg" color="fire"></pt-icon>

<!-- 白（inverse）-->
<pt-icon src="fire.svg" color="inverse"></pt-icon>

<!-- 親の色を継承（デフォルト）-->
<pt-icon src="fire.svg"></pt-icon>
```

---

## 技術設計

### 実装方式: CSS mask

`<img>` タグでは SVG の色を CSS で変更できないため、`<div>` + CSS mask を使用する。

```scss
.pt-icon {
  background-color: var(--icon-color, currentColor);
  mask-image: var(--icon-src);
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: var(--icon-src);
  -webkit-mask-size: contain;
}
```

### 新 API

```typescript
@Input() color?: PokemonType | 'inverse';

// 変換ロジック
get iconColor(): string | null {
  if (!this.color) return null;
  if (this.color === 'inverse') return 'var(--pt-color-text-inverse)';
  return `var(--pt-color-pokemon-${this.color}-500)`;
}
```

### 後方互換性

- `color` が未指定の場合は `currentColor` を使用（親の色を継承）
- 既存の使用箇所に影響なし

---

## 実装計画

### Phase 0: 準備

#### 0.1 ブランチ作成

```bash
git checkout main
git pull origin main
git checkout -b refactor/pt-icon-color-support
```

#### 0.2 SVG 変更をコミット（完了済み）

SVG アイコンは白抜き（`fill: #fff`）で統一済み。

---

### Phase 1: pt-icon コンポーネント改修

#### 1.1 型定義の追加

**ファイル:** `src/app/ui/pt-icon/pt-icon.types.ts`（新規作成）

```typescript
import { PokemonType } from '@domain/type-chart';

export const ICON_SIZES = ['sm', 'md', 'lg'] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export type IconColor = PokemonType | 'inverse';
```

#### 1.2 コンポーネント改修

**ファイル:** `src/app/ui/pt-icon/pt-icon.ts`

変更内容:
- `IconSize`, `IconColor` 型をインポート
- `color` input を追加
- `iconColor` getter を追加（color → CSS 変数変換）
- `maskImageUrl` getter を追加

```typescript
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSize, IconColor } from './pt-icon.types';

@Component({
  selector: 'pt-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pt-icon.html',
  styleUrls: ['./pt-icon.scss'],
})
export class IconComponent {
  @Input({ required: true }) src!: string;
  @Input() size: IconSize = 'md';
  @Input() alt = '';
  @Input() color?: IconColor;

  get iconClasses(): string[] {
    return ['pt-icon', `pt-icon--${this.size}`];
  }

  get iconColor(): string | null {
    if (!this.color) return null;
    if (this.color === 'inverse') return 'var(--pt-color-text-inverse)';
    return `var(--pt-color-pokemon-${this.color}-500)`;
  }

  get maskImageUrl(): string {
    return `url(${this.src})`;
  }
}
```

#### 1.3 テンプレート改修

**ファイル:** `src/app/ui/pt-icon/pt-icon.html`

```html
@if (color) {
  <!-- 着色モード: CSS mask -->
  <div 
    [ngClass]="iconClasses"
    [style.background-color]="iconColor"
    [style.mask-image]="maskImageUrl"
    [style.-webkit-mask-image]="maskImageUrl"
    role="img"
    [attr.aria-label]="alt || null"
  ></div>
} @else {
  <!-- 従来モード: img タグ（後方互換） -->
  <img 
    [src]="src" 
    [alt]="alt" 
    [ngClass]="iconClasses"
  />
}
```

#### 1.4 スタイル改修

**ファイル:** `src/app/ui/pt-icon/pt-icon.scss`

```scss
/**
 * @what Icon component styles
 * @why Provide flexible icon display with color support using Design Tokens
 *
 * @tokens Tier 3: icon.json
 */

@use 'mixins/component-base' as base;

:host {
  @include base.host-image;
}

.pt-icon {
  display: block;
  object-fit: contain;

  // CSS mask 用スタイル（color指定時）
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;

  // Size variants
  &--sm {
    width: var(--pt-icon-size-sm);
    height: var(--pt-icon-size-sm);
  }

  &--md {
    width: var(--pt-icon-size-md);
    height: var(--pt-icon-size-md);
  }

  &--lg {
    width: var(--pt-icon-size-lg);
    height: var(--pt-icon-size-lg);
  }
}
```

---

### Phase 2: Icon デモリファクタ

#### 2.1 sizes-demo.component.ts

**ファイル:** `projects/docs/src/components/icon/demos/sizes-demo.component.ts`

背景ラッパーを削除し、`color` プロパティを使用:

```typescript
import { Component, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';

@Component({
  selector: 'icon-sizes-demo',
  standalone: true,
  imports: [IconComponent],
  template: `
    @for (size of sizes; track size) {
      <pt-icon [src]="iconPath" [size]="size" color="fire"></pt-icon>
    }
  `,
})
export class IconSizesDemoComponent {
  private readonly assetPath = inject(AssetPathService);
  readonly sizes = ['sm', 'md', 'lg'] as const;

  get iconPath(): string {
    return this.assetPath.icon('fire');
  }
}
```

#### 2.2 types-demo.component.ts

**ファイル:** `projects/docs/src/components/icon/demos/types-demo.component.ts`

```typescript
import { Component, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';
import { IconColor } from '@ui/pt-icon/pt-icon.types';

@Component({
  selector: 'icon-types-demo',
  standalone: true,
  imports: [IconComponent],
  template: `
    @for (type of types; track type) {
      <pt-icon [src]="getIconPath(type)" size="md" [color]="type"></pt-icon>
    }
  `,
})
export class IconTypesDemoComponent {
  private readonly assetPath = inject(AssetPathService);
  readonly types: IconColor[] = ['fire', 'water', 'grass', 'electric', 'ice', 'fighting'];

  getIconPath(type: string): string {
    return this.assetPath.icon(type);
  }
}
```

#### 2.3 playground.component.ts

**ファイル:** `projects/docs/src/components/icon/demos/playground.component.ts`

`color` プロパティを Playground に追加:

```typescript
import { Component, Input, inject } from '@angular/core';
import { IconComponent } from '@ui/pt-icon/pt-icon';
import { AssetPathService } from '@app/core/services/asset-path.service';
import { IconSize, IconColor } from '@ui/pt-icon/pt-icon.types';
import { PokemonType } from '@domain/type-chart';

@Component({
  selector: 'icon-playground',
  standalone: true,
  imports: [IconComponent],
  template: `
    <pt-icon [src]="iconPath" [size]="size" [color]="color" [alt]="alt"></pt-icon>
  `,
})
export class IconPlaygroundComponent {
  private readonly assetPath = inject(AssetPathService);

  @Input() iconName: PokemonType = 'fire';
  @Input() size: IconSize = 'md';
  @Input() color: IconColor = 'fire';
  @Input() alt = '';

  get iconPath(): string {
    return this.assetPath.icon(this.iconName || 'fire');
  }
}
```

---

### Phase 3: ドキュメント更新

#### 3.1 api.md

**ファイル:** `projects/docs/src/components/icon/api.md`

Playground の `color` プロパティが自動的に表示される。

#### 3.2 examples.md

**ファイル:** `projects/docs/src/components/icon/examples.md`

着色の例を追加:

```markdown
## Colored Icons

タイプカラーで着色したアイコン：

{{ NgDocActions.demo("IconTypesDemoComponent") }}
```

---

### Phase 4: 影響確認

#### 4.1 pt-type-chip 確認

`pt-type-chip` は `pt-chip` 経由でアイコンを使用。
背景色があるため `color="inverse"` を使用するよう修正が必要な可能性あり。

#### 4.2 pt-chip 確認

アイコンに色を渡す機能が必要か確認。

---

### Phase 5: 検証

#### 5.1 ローカル検証

```bash
npm run lint:css && npm run lint && npm test && npm run build
```

#### 5.2 ガードレール検証

```bash
npm run guards:validate
```

#### 5.3 NgDoc ビルド確認

```bash
npm run docs:build
```

#### 5.4 動作確認

```bash
npm run docs:serve -- --port 4300
```

http://localhost:4300/#/components/icon/examples でデモを確認。

---

### Phase 6: PR作成・マージ

#### 6.1 コミット

```bash
git add src/app/ui/pt-icon projects/docs/src/components/icon
git commit -m "feat(icon): add color property for icon colorization"
git push origin refactor/pt-icon-color-support
```

#### 6.2 PR作成

```bash
node -e "const { spawnSync } = require('child_process'); const emoji = JSON.parse(require('fs').readFileSync('.agent/emoji-prefixes.json', 'utf8')).prefixes.feat; const title = emoji + ' feat(icon): add color property for icon colorization'; spawnSync('gh', ['pr', 'create', '--title', title, '--body-file', 'pr-body.md'], { stdio: 'inherit' });"
```

#### 6.3 CI確認・マージ

```bash
gh pr checks
gh pr merge --squash --delete-branch
```

---

## チェックリスト

### Phase 0: 準備
- [ ] ブランチ作成 `refactor/pt-icon-color-support`
- [ ] SVG 変更コミット済み

### Phase 1: コンポーネント改修
- [ ] `pt-icon.types.ts` 作成
- [ ] `pt-icon.ts` に `color` input 追加
- [ ] `pt-icon.html` を条件分岐で改修
- [ ] `pt-icon.scss` に CSS mask スタイル追加

### Phase 2: デモリファクタ
- [ ] `sizes-demo.component.ts` - 背景削除、color 使用
- [ ] `types-demo.component.ts` - 背景削除、color 使用
- [ ] `playground.component.ts` - color 追加

### Phase 3: ドキュメント
- [ ] `examples.md` 更新

### Phase 4: 影響確認
- [ ] `pt-type-chip` 動作確認
- [ ] `pt-chip` 動作確認

### Phase 5: 検証
- [ ] `npm run lint:css` パス
- [ ] `npm run lint` パス
- [ ] `npm test` パス
- [ ] `npm run build` パス
- [ ] `npm run guards:validate` パス
- [ ] `npm run docs:build` パス
- [ ] 動作確認（localhost:4300）

### Phase 6: PR
- [ ] コミット
- [ ] プッシュ
- [ ] PR作成
- [ ] CI確認
- [ ] マージ（ユーザーがOKと言ったら）

---

## 工数見積もり

| Phase | 工数 |
|-------|------|
| Phase 0: 準備 | 5分 |
| Phase 1: コンポーネント改修 | 20分 |
| Phase 2: デモリファクタ | 10分 |
| Phase 3: ドキュメント | 5分 |
| Phase 4: 影響確認 | 10分 |
| Phase 5: 検証 | 10分 |
| Phase 6: PR | 10分 |
| **合計** | **約70分** |

---

## 関連

- [pt-icon コンポーネント](../../src/app/ui/pt-icon/)
- [Icon NgDoc ドキュメント](../../projects/docs/src/components/icon/)
- [コンポーネント実装ワークフロー](../../.agent/workflows/component.md)
- [コンポーネントドキュメントワークフロー](../../.agent/workflows/component-doc.md)
