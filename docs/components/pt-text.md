# pt-text

本文・ラベル・補助テキスト用のタイポグラフィコンポーネント。

## 📝 概要

`pt-text` は Design Tokens (Tier 2) に基づいた一貫したタイポグラフィスタイルをテキストコンテンツに適用します。`.quiz-phase-label` や `.pokemon-name` のような独自 CSS クラスの撲滅を目的としています。

**使用するとき**:
- 本文テキスト、段落
- ラベル、キャプション
- メタデータ、ステータス表示
- 構造的な見出し以外のテキスト全般

**使用しないとき**:
- 構造的な見出し (h1-h6) → `pt-heading` を使用
- ボタン内テキスト → `pt-button` を使用
- リンク → 将来の `pt-link` を使用

## 🛠️ API

### Props

| Prop | 型 | デフォルト値 | 説明 |
|------|------|---------|-------------|
| `variant` | `'body-lg' \| 'body-md' \| 'body-sm' \| 'label-md' \| 'label-sm' \| 'label-xs'` | `'body-md'` | セマンティックな役割（サイズ・行間） |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| 'inverse' \| 'danger'` | `'primary'` | テキストの色 |
| `weight` | `'normal' \| 'medium' \| 'bold' \| 'black'` | variant のデフォルト | フォントの太さ（上書き用） |
| `transform` | `'none' \| 'uppercase' \| 'lowercase' \| 'capitalize'` | `'none'` | テキスト変換 |
| `element` | `'span' \| 'p' \| 'div' \| 'label'` | `'span'` | 出力する HTML 要素 |
| `italic` | `boolean` | `false` | イタリック体 |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | テキスト揃え |

### Token マッピング

| Variant | Typography Token |
|---------|-----------------|
| `body-lg` | `--pt-typography-body-lg-*` |
| `body-md` | `--pt-typography-body-md-*` |
| `body-sm` | `--pt-typography-body-sm-*` |
| `label-md` | `--pt-typography-label-md-*` |
| `label-sm` | `--pt-typography-label-sm-*` |
| `label-xs` | `--pt-typography-label-xs-*` |

## ♿ アクセシビリティ

- 色のコントラスト比は Tier 2 color tokens により 4.5:1 以上を保証
- `transform="uppercase"` は視覚的な変換のみ（スクリーンリーダーの読み上げには影響しません）
- `element="label"` を使用する場合は、関連するフォームコントロールと紐付けてください

## 🧩 使用例

### 基本的な使い方

```html
<!-- 標準本文 -->
<pt-text>これは標準の本文テキストです。</pt-text>

<!-- フェーズラベル -->
<pt-text variant="label-xs" color="secondary" transform="uppercase" [italic]="true">
  Phase 0: Battle Trial
</pt-text>

<!-- ポケモン名 -->
<pt-text variant="body-lg" weight="bold">{{ pokemon.name }}</pt-text>
```

### 異なる HTML 要素での使用

```html
<!-- パラグラフ -->
<pt-text element="p">
  この段落は p 要素としてレンダリングされます。
</pt-text>

<!-- フォームラベル -->
<pt-text element="label" variant="label-md">
  ユーザー名
</pt-text>
```

## 📐 デザインパターン

### 独自クラスの置き換え

Before (アンチパターン):
```html
<span class="quiz-phase-label">Phase 0</span>
```

After (正しい方法):
```html
<pt-text variant="label-xs" color="secondary" transform="uppercase">
  Phase 0
</pt-text>
```

## 🔗 関連コンポーネント

- **pt-heading**: 構造的な見出し (h1-h6) 用
- **pt-button**: ボタン内テキスト（内部でタイポグラフィを処理）
- **pt-chip / pt-badge**: 背景付きの小さなラベルコンテンツ

## 📚 参照

- [Issue #76](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/76)
- [GitHub Primer Text](https://primer.style/components/text)
- [SmartHR Text](https://smarthr.design/products/components/text/)
