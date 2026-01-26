# pt-text コンポーネント設計書

## 📋 概要

**コンポーネント名**: `pt-text`  
**配置**: `src/app/ui/pt-text/`  
**セレクタ**: `pt-text`  
**種別**: Atom (Design System / 汎用)

### 責務
- テキストの「意味（Variant）」と「スタイル」をDesign Tokensに基づいて適用
- Semantic HTML要素 (`span`, `p`, `div`, `label`) を `as` プロパティで柔軟に選択可能
- Typography関連の独自クラス (`.quiz-phase-label`, `.pokemon-name` 等) を撲滅

### pt-heading との違い
| 項目 | pt-heading | pt-text |
|------|------------|---------|
| 用途 | 構造的な見出し (h1-h6) | 本文・ラベル・補助テキスト |
| HTML出力 | h1-h6 | span, p, div, label |
| セマンティクス | 文書構造を定義 | 視覚的スタイルのみ (文書構造なし) |
| 典型例 | ページタイトル、セクション見出し | 説明文、メタ情報、UIラベル |

---

## 🎯 ベンチマーク調査結果

### Material Design 3 (Typography)
- T-shirt sizing (XS - XXXL)
- Composite tokens で font-family, size, weight, line-height をまとめる
- 用途別カテゴリ: Display, Headline, Title, Body, Label

### GitHub Primer (Text)
- `size`: `'large' | 'medium' | 'small'`
- `weight`: `'light' | 'normal' | 'medium' | 'semibold'`
- `as`: React.ElementType (span, p, div, etc.)
- `sx` prop でカスタムスタイル
- シンプルで開発者フレンドリー

### SmartHR Design System (Text)
- `size`: フォントサイズトークンを参照
- `weight`: 太さ
- `color`: 文字色トークンを参照
- `emphasis`: 強調
- `italic`: イタリック
- `leading`: 行送り
- `whiteSpace`: 折り返し
- `styleType`: Heading風の見た目

### Adobe Spectrum (Body)
- Classification: serif / sans-serif
- Size: XS - XXXL (T-shirt sizing)
- Bold, Italic, Underline, Strong, Emphasis オプション
- Line height は言語ごとに異なる (Latin: 1.5×, Han: 1.7×)

---

## 🛠️ API (Props)

現在のプロジェクトの typography.json と既存コンポーネントに合わせて設計。

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'body-lg' \| 'body-md' \| 'body-sm' \| 'label-md' \| 'label-sm' \| 'label-xs'` | `'body-md'` | テキストの意味（サイズ・行間等）を決定 |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| 'inverse' \| 'danger'` | `'primary'` | テキストの色 |
| `weight` | `'normal' \| 'medium' \| 'bold' \| 'black'` | variant に依存 | フォントの太さ (オプション、上書き用) |
| `transform` | `'none' \| 'uppercase' \| 'lowercase' \| 'capitalize'` | `'none'` | テキスト変換 |
| `as` | `'span' \| 'p' \| 'div' \| 'label'` | `'span'` | 出力 HTML 要素 |
| `italic` | `boolean` | `false` | イタリック体 |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | テキスト揃え |

### Variant → Token マッピング

| Variant | Typography Token | 備考 |
|---------|-----------------|------|
| `body-lg` | `typography.body.lg` | リードパラグラフ |
| `body-md` | `typography.body.md` | 標準本文 (default) |
| `body-sm` | `typography.body.sm` | 注釈、メタ情報 |
| `label-md` | `typography.label.md` | ボタン、ナビ |
| `label-sm` | `typography.label.sm` | タグ、バッジ |
| `label-xs` | `typography.label.xs` | メタデータ、ステータス |

### Color → CSS変数 マッピング

| Color | CSS Variable |
|-------|-------------|
| `primary` | `--pt-color-text-primary` |
| `secondary` | `--pt-color-text-secondary` |
| `disabled` | `--pt-color-text-disabled` |
| `inverse` | `--pt-color-text-inverse` |
| `danger` | `--pt-color-result-lose-default` (仮) |

---

## 🧩 使用例

### 1. Quiz画面のフェーズラベル (Before → After)
```html
<!-- Before: 独自クラス -->
<span class="quiz-phase-label">Phase 0: Battle Trial</span>

<!-- After: pt-text -->
<pt-text variant="label-xs" color="secondary" transform="uppercase" [italic]="true">
  Phase 0: Battle Trial
</pt-text>
```

### 2. ポケモン名の表示
```html
<!-- Before: 独自クラス -->
<span class="pokemon-name">{{ pokemon.name }}</span>

<!-- After: pt-text -->
<pt-text variant="body-lg" weight="bold">{{ pokemon.name }}</pt-text>
```

### 3. セクションラベル
```html
<!-- Before -->
<span class="quiz-section-label">こうげき側 (タイプ)</span>

<!-- After -->
<pt-text variant="label-xs" color="secondary" transform="uppercase">
  こうげき側 (タイプ)
</pt-text>
```

### 4. 選択肢の数値 (ボタン内)
```html
<!-- Before -->
<span class="choice-value">{{ choice }}</span>
<span class="choice-unit">倍</span>

<!-- After -->
<pt-text variant="body-lg" weight="bold">{{ choice }}</pt-text>
<pt-text variant="label-xs" color="secondary">倍</pt-text>
```

---

## 📁 ファイル構成

```
src/app/ui/pt-text/
├── pt-text.ts       # Component (standalone)
├── pt-text.html     # Template
├── pt-text.scss     # Styles (Design Tokens使用)
└── pt-text.spec.ts  # Unit tests
```

---

## ⚙️ Tier 3 トークン

`design-tokens/tier3-component/text.json` を作成

```json
{
  "$description": "Tier 3: pt-text コンポーネント専用トークン。Tier 2 Typography Tokens を参照。",
  "text": {
    "variant": {
      "body-lg": { "value": "{typography.body.lg}" },
      "body-md": { "value": "{typography.body.md}" },
      "body-sm": { "value": "{typography.body.sm}" },
      "label-md": { "value": "{typography.label.md}" },
      "label-sm": { "value": "{typography.label.sm}" },
      "label-xs": { "value": "{typography.label.xs}" }
    }
  }
}
```

---

## ♿ アクセシビリティ

- `as="label"` を使用する場合、対応する `for` 属性と input 要素との関連付けを呼び出し側で行う
- 色のコントラスト比は Tier 2 トークンで4.5:1以上を保証
- `transform="uppercase"` は読み上げに影響しない (CSSによる視覚的変換のみ)

---

## 🚫 When NOT to use

1. **構造的な見出しが必要な場合** → `pt-heading` を使用
2. **ボタン内テキスト** → `pt-button` が内部で処理
3. **リンクテキスト** → 将来の `pt-link` コンポーネント
4. **コードブロック** → 将来の `pt-code` コンポーネント

---

## 📋 実装チェックリスト

- [ ] Tier 3 トークン定義 (`text.json`)
- [ ] コンポーネント実装 (`pt-text.ts`, `.html`, `.scss`)
- [ ] ユニットテスト (`pt-text.spec.ts`)
- [ ] Quiz画面で独自クラスを pt-text に置換
- [ ] Lint/Build 通過確認

---

## 🔗 参照

- **Issue**: [#76 ♻️ refactor: apply Smart/Dumb pattern and create pt-text for Quiz screen](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/76)
- **Primer Text**: https://primer.style/components/text
- **SmartHR Text**: https://smarthr.design/products/components/text/
- **Typography Tokens**: `design-tokens/tier2-semantic/typography.json`
