# pt-heading

> コンテンツの階層構造を定義するタイポグラフィコンポーネント

**ベンチマーク**: [GitHub Primer Heading](https://primer.style/components/heading) | [SmartHR Heading](https://smarthr.design/products/components/heading/) | [Adobe Spectrum Heading](https://spectrum.adobe.com/page/heading/)

---

## Overview

セマンティックなHTML見出し要素（h1-h6）を出力し、一貫したタイポグラフィスタイリングを提供します。オプションでアクセントバー（左側の縦棒）を表示し、セクションの開始を視覚的に強調できます。

**Heading is a typography component used to create various levels of hierarchies between text.** — Adobe Spectrum

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

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | **required** | セマンティックな見出しレベル (h1-h6) |
| `size` | `'xl' \| 'lg' \| 'md' \| 'sm'` | (levelから推論) | 視覚的なサイズ。typography.heading トークンに対応 |
| `accent` | `boolean` | `false` | アクセントバー（左側の縦棒）を表示するか |

### Size Tokens

| Size | Typography Token | 用途（SmartHR相当） |
|------|------------------|---------------------|
| `xl` | `typography.heading.xl` | 画面タイトル (screenTitle) - 1ページに1回のみ |
| `lg` | `typography.heading.lg` | セクションタイトル (sectionTitle) |
| `md` | `typography.heading.md` | ブロックタイトル (blockTitle) |
| `sm` | `typography.heading.sm` | サブ・ブロックタイトル |

### Level → Size 自動推論

| Level | Default Size | HTML Element |
|-------|--------------|--------------|
| 1 | `xl` | `<h1>` |
| 2 | `lg` | `<h2>` |
| 3 | `md` | `<h3>` |
| 4-6 | `sm` | `<h4>`-`<h6>` |

---

## Accessibility

- ✅ **適切な見出しレベル**: h1-h6 を正しく出力することで、スクリーンリーダーがドキュメント構造を認識可能
- ✅ **見出しの順序**: h1 → h2 → h3 の順番を飛ばさないこと
- ✅ **装飾要素の非表示**: アクセントバーには `aria-hidden="true"` が付与され、スクリーンリーダーには影響しない
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

### With Accent Bar

```html
<pt-heading [level]="3" [accent]="true">
  わざのダメージ倍率は？
</pt-heading>
```

### Usage Patterns by Type

```html
<!-- 画面タイトル (1ページに1回のみ) -->
<pt-heading [level]="1">ポケモン耐性クイズ</pt-heading>

<!-- セクションタイトル -->
<pt-heading [level]="2">出題範囲設定</pt-heading>

<!-- ブロックタイトル（質問） - アクセントバー付き -->
<pt-heading [level]="3" [accent]="true">わざのダメージ倍率は？</pt-heading>

<!-- カード内タイトル -->
<pt-heading [level]="4">ポケモン情報</pt-heading>
```

---

## Design Patterns

### Semantic Level vs Visual Size

セマンティックレベル（`level`）と視覚的サイズ（`size`）は分離されています。これにより柔軟なスタイリングが可能です：

```html
<!-- h3 要素だが、視覚的には大きな lg サイズ -->
<pt-heading [level]="3" size="lg">
  重要なサブセクション
</pt-heading>
```

### Accent Bar for Questions

質問形式のセクションにはアクセントバーを使用して、視覚的なランドマークを提供します：

```html
<pt-heading [level]="3" [accent]="true">
  わざのダメージ倍率は？
</pt-heading>
```

---

## Related Components

- `pt-card-header`: カード内の見出しエリア（pt-heading を内包可能）
- `pt-alert`: フィードバック用のタイトル

---

## References

- [GitHub Primer Heading](https://primer.style/components/heading)
- [SmartHR Heading](https://smarthr.design/products/components/heading/)
- [Adobe Spectrum Heading](https://spectrum.adobe.com/page/heading/)
- [W3C Heading Best Practices](https://www.w3.org/WAI/tutorials/page-structure/headings/)
