# pt-heading 設計書

## Overview

コンテンツの階層構造を定義するタイポグラフィコンポーネント。セマンティックなHTML見出し要素（h1-h6）を出力し、一貫したスタイリングを提供します。

> **Heading is a typography component used to create various levels of hierarchies between text.**
> — Adobe Spectrum

### Atomic Design Level
- **Atom**: 単一のテキスト要素で構成される基本的なコンポーネント

---

## Benchmark References

| Design System | 主な特徴 | 参考URL |
|---------------|----------|---------|
| **GitHub Primer** | `as` prop でHTML要素指定、size は 'large' / 'medium' / 'small' | [Heading](https://primer.style/components/heading) |
| **SmartHR** | `type` で用途指定 (screenTitle, sectionTitle, blockTitle)、サイズ可変 | [Heading](https://smarthr.design/products/components/heading/) |
| **Adobe Spectrum** | T-shirt sizing、classification (serif/sans)、weight | [Heading](https://spectrum.adobe.com/page/heading/) |

### 各デザインシステムにおけるHeadingの用途

#### SmartHR Design System からの学び
SmartHRはHeadingを**5つの用途**に明確に分類しています：

| 種類 | HTML要素 | 用途 | プロジェクトへの適用 |
|------|----------|------|---------------------|
| **画面タイトル (screenTitle)** | h1 | 画面ごとに1度のみ使用 | ページタイトル |
| **セクションタイトル (sectionTitle)** | h2 | 主要な区切り | カード外のセクション見出し |
| **ブロックタイトル (blockTitle)** | h3/h4 | ブロック内のタイトル | カード内のタイトル |
| **サブ・ブロックタイトル** | h4/h5 | 小見出し | リスト項目のヘッダー |
| **サブ・サブ・ブロックタイトル** | h5/h6 | 最小の見出し | —（使用頻度低） |

#### GitHub Primer からの学び
- **セマンティックレベル（`as`）** と **視覚的サイズ（`size`）** を分離
- これにより、h3要素でも視覚的には「large」サイズにできる柔軟性を確保

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **ページコンテンツに明確な構造を与えたい場合** | Headingはページのセクションを区切り、ユーザーがコンテンツをスキャンしやすくする |
| **スクリーンリーダーユーザーへのナビゲーション提供** | 見出し要素はスクリーンリーダーのランドマークとして機能し、ページ内ジャンプを可能にする |
| **セクションの開始を明示する場合** | 「わざのダメージ倍率は？」のような質問文も、セクションの開始を示すHeadingとして適切 |
| **本文テキストから視覚的に区別したい場合** | 太字やサイズ変更だけでなく、一貫したスタイルで階層を表現できる |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **ラベルやキャプションとして** | Headingはセクションの開始を示すもの。単なるラベルには過剰 | `<label>` や `<span>` + Typography Token |
| **装飾目的での大きな文字** | 太字にしたいだけでh1を使うと、ドキュメント構造が壊れる | Typography Token (`text-heading-lg`) を直接適用 |
| **リスト項目のタイトル** | 各アイテムにh3を使うと見出しが多すぎてスキャン性が低下 | `<strong>` または `<dt>` |
| **ナビゲーションリンク内** | 見出しはリンク内に含めるべきではない | `<a>` + 適切なスタイル |
| **ボタンやインタラクティブ要素内** | セマンティックエラー | ボタン内は通常のテキストで |

---

## Props Definition

### Core Essence Principle

「見出し」の本質的な責務は：
1. **セマンティック構造**: HTML見出しレベル（h1-h6）によるドキュメント構造の定義
2. **視覚的階層**: サイズバリアントによるテキストの重要度表現
3. **アクセントバー**: オプションの装飾要素（セクションの開始を視覚的に強調）

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | **required** | ✅ | セマンティックな見出しレベル (h1-h6) |
| `size` | `'xl' \| 'lg' \| 'md' \| 'sm'` | (levelから推論) | | 視覚的なサイズ。typography.heading トークンに対応 |
| `accent` | `boolean` | `false` | | アクセントバー（左側の縦棒）を表示するか |

### Design Decision: `level` と `size` の分離

**Why separate level and size?**
- GitHub Primer や Adobe Spectrum の設計に倣い、**セマンティックレベル（HTML構造）** と **視覚的サイズ（CSS）** を分離する
- 例: カード内の見出しは h3 だが、視覚的には `md` サイズで十分な場合がある
- デフォルトでは `level` に基いて `size` を推論する（h1→xl, h2→lg, h3→md, h4-h6→sm）

### Props NOT Included (Core Essence Principle)

以下は `pt-heading` の責務外：
- **color**: テキストカラーは Typography Token で定義済み。特殊な色が必要な場合は親要素で対応
- **accentColor**: 常に `--pt-color-action-primary-default` を使用（シンプル化のため）
- **margin/padding**: 使用箇所で調整。コンポーネントはマージン・パディングを持たない

---

## Token Design (Tier 3)

`design-tokens/tier3-component/heading.json` を新規作成：

```json
{
  "$description": "Tier 3: Heading Component Tokens",
  "heading": {
    "$description": "Heading typography コンポーネント。セクション見出しに使用。",
    "accent": {
      "width": {
        "value": "6px",
        "type": "sizing",
        "$description": "アクセントバーの幅"
      },
      "height": {
        "value": "{space.6}",
        "type": "sizing",
        "$description": "アクセントバーの高さ"
      },
      "radius": {
        "value": "{radius.full}",
        "type": "borderRadius",
        "$description": "アクセントバーの角丸"
      },
      "gap": {
        "value": "{space.2}",
        "type": "spacing",
        "$description": "アクセントバーとテキスト間のギャップ"
      }
    }
  }
}
```

**Note**: アクセントバーの色は CSS で直接 `--pt-color-action-primary-default` を参照する（トークンに含めない）。

### Typography Mapping

既存の `typography.heading.*` トークン (Tier 2) を使用：

| Size | Typography Token | 用途（SmartHR相当） |
|------|------------------|---------------------|
| `xl` | `typography.heading.xl` | 画面タイトル (screenTitle) |
| `lg` | `typography.heading.lg` | セクションタイトル (sectionTitle) |
| `md` | `typography.heading.md` | ブロックタイトル (blockTitle) |
| `sm` | `typography.heading.sm` | サブ・ブロックタイトル |

---

## Implementation

### Template Structure (ngSwitch)

Angularでは動的にHTML要素を変更できないため、`ngSwitch` で各レベルを出力：

```html
<ng-container [ngSwitch]="level">
  <h1 *ngSwitchCase="1" [ngClass]="headingClasses">
    <span *ngIf="accent" class="pt-heading__accent" aria-hidden="true"></span>
    <ng-content></ng-content>
  </h1>
  <h2 *ngSwitchCase="2" [ngClass]="headingClasses">
    <span *ngIf="accent" class="pt-heading__accent" aria-hidden="true"></span>
    <ng-content></ng-content>
  </h2>
  <!-- h3-h6 も同様 -->
</ng-container>
```

### Dynamic Class Getter (Approach A)

```typescript
get headingClasses(): string[] {
  const actualSize = this.size ?? this.defaultSizeForLevel(this.level);
  return [
    'pt-heading',
    `pt-heading--${actualSize}`,
    this.accent ? 'pt-heading--accent' : ''
  ].filter(Boolean);
}

private defaultSizeForLevel(level: HeadingLevel): HeadingSize {
  const map: Record<HeadingLevel, HeadingSize> = {
    1: 'xl', 2: 'lg', 3: 'md', 4: 'sm', 5: 'sm', 6: 'sm'
  };
  return map[level];
}
```

---

## Accessibility

- ✅ **適切な見出しレベル**: h1-h6 を正しく出力することで、スクリーンリーダーがドキュメント構造を認識可能
- ✅ **見出しの順序**: h1 → h2 → h3 の順番を飛ばさないこと（SmartHRガイドライン準拠）
- ✅ **装飾要素の非表示**: アクセントバーには `aria-hidden="true"` を付与し、スクリーンリーダーには影響しない
- ✅ **1ページ1回のh1**: 画面タイトル（level=1）は1ページに1回のみ使用すること

---

## Examples

### Basic Usage

```html
<!-- 自動サイズ (h2 → lg) -->
<pt-heading [level]="2">セクションタイトル</pt-heading>

<!-- サイズ明示 -->
<pt-heading [level]="3" size="lg">視覚的に大きめのサブセクション</pt-heading>
```

### Quiz Screen Usage (Target Refactoring)

**Before (カスタム実装):**
```html
<p class="text-text-primary font-black text-xl mb-6 flex items-center gap-2">
  <span class="w-1.5 h-6 bg-primary rounded-full"></span>
  わざのダメージ倍率は？
</p>
```

**After (pt-heading):**
```html
<pt-heading [level]="3" [accent]="true">
  わざのダメージ倍率は？
</pt-heading>
```

### Usage Patterns by SmartHR Type

| 用途 | 実装例 |
|------|--------|
| 画面タイトル | `<pt-heading [level]="1">ポケモン耐性クイズ</pt-heading>` |
| セクションタイトル | `<pt-heading [level]="2">出題範囲設定</pt-heading>` |
| ブロックタイトル（質問） | `<pt-heading [level]="3" [accent]="true">わざのダメージ倍率は？</pt-heading>` |
| カード内タイトル | `<pt-heading [level]="4">ポケモン情報</pt-heading>` |

---

## File Structure

```
src/app/ui/pt-heading/
├── pt-heading.ts       # Component class
├── pt-heading.html     # Template
├── pt-heading.scss     # Styles
└── pt-heading.spec.ts  # Unit tests

design-tokens/tier3-component/
└── heading.json        # Component tokens (Tier 3)
```

---

## Related Components

- **pt-card-header**: カード内の見出しエリア（pt-heading を内包可能）
- **pt-alert**: フィードバック用のタイトル（pt-heading ではなく内蔵スタイルを使用）

---

## References

- [GitHub Primer Heading](https://primer.style/components/heading)
- [SmartHR Heading](https://smarthr.design/products/components/heading/)
- [Adobe Spectrum Heading](https://spectrum.adobe.com/page/heading/)
- [W3C Heading Best Practices](https://www.w3.org/WAI/tutorials/page-structure/headings/)
