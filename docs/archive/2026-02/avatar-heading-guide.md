# Avatar / Heading コンポーネント設計ガイド

Phase 3e: Avatar/Heading 改善に関する設計決定ドキュメント

---

## pt-avatar

### 概要

画像を表示するためのアバターコンポーネント。ユーザープロフィール、サムネイル、ゲームアセット表示に使用。

### Size バリアント

| サイズ | 値 | 用途 |
|--------|------|------|
| `sm` | 32px | リスト内のアイコン、インライン表示 |
| `md` | 48px | 標準的なアバター、カード内サブ画像 |
| `lg` | 80px | カード内メイン画像、プロフィール |
| `xl` | 120px | フルスクリーンプロフィール、ヒーロー画像 |

### Shape バリアント

| 形状 | 角丸 | 用途 |
|------|------|------|
| `circle` | 9999px | 円形に切り抜きたい画像 |
| `rounded` | 12px | 角丸のサムネイル、モダンな印象 |
| `square` | 4px | シャープなエッジ、**ピクセルアート向け** |

> 📝 **注意**: 透明背景の画像（ポケモンのスプライトなど）では角丸の違いが見えにくいです。
> NgDoc のデモでは背景色を付けて違いを可視化しています。

### ポケモンクイズでの推奨設定

```html
<!-- ポケモン画像の表示 -->
<pt-avatar
  [src]="pokemon.imageUrl"
  [alt]="pokemon.japaneseName"
  size="lg"
  shape="square"
  [pixelated]="true">
</pt-avatar>
```

**理由:**
- `shape="square"`: ピクセルアート特有のシャープなエッジを保持
- `pixelated="true"`: `image-rendering: pixelated` でレトロゲーム感を維持

---

## pt-heading

### 概要

セマンティックな見出し要素（h1-h6）を出力し、一貫したタイポグラフィを提供。

### Level と Size の分離設計

pt-heading は**セマンティックレベル（level）**と**視覚的サイズ（size）**を分離しています。

#### なぜ分離するのか？

1. **アクセシビリティ**: スクリーンリーダーは `level` から見出し階層を認識
2. **デザインの柔軟性**: h3 でも視覚的に大きく表示できる
3. **既存コンテンツとの互換性**: レイアウト制約で見出し階層を変えられない場合に対応

#### デフォルトマッピング

| Level | デフォルト Size | HTML出力 | 用途 |
|-------|---------------|----------|------|
| 1 | xl (36px) | `<h1>` | ページタイトル（1ページに1つ） |
| 2 | lg (24px) | `<h2>` | セクションタイトル |
| 3 | md (20px) | `<h3>` | ブロックタイトル |
| 4-6 | sm (18px) | `<h4-h6>` | サブ見出し |

#### 使い分けパターン

```html
<!-- パターン1: デフォルト（level から size を自動推論） -->
<pt-heading [level]="2">セクションタイトル</pt-heading>
<!-- → h2 + lg サイズ -->

<!-- パターン2: 視覚的に小さく表示したいが h2 を維持 -->
<pt-heading [level]="2" size="sm">サブセクション</pt-heading>
<!-- → h2 + sm サイズ（アクセシビリティ上は h2、視覚的に控えめ） -->

<!-- パターン3: 視覚的に大きく表示したいが h3 を維持 -->
<pt-heading [level]="3" size="lg">重要なブロック</pt-heading>
<!-- → h3 + lg サイズ（既存の見出し階層を壊さず強調） -->
```

### Accent バリアント

アクセントバー（左側の縦棒）を表示し、セクションの開始を視覚的に強調。

```html
<pt-heading [level]="2" [accent]="true">
  わざのダメージ倍率は？
</pt-heading>
```

**スタイル仕様:**
- 幅: 6px
- 高さ: 24px（テキスト行高さに合わせる）
- 角丸: pill形状（9999px）
- 色: プライマリテキストカラーと統一

---

## トークン構成

### Avatar トークン (Tier 3)

```
avatar.size.{sm|md|lg|xl}     - サイズ（直接px指定）
avatar.radius.{circle|rounded|square} - 角丸（Tier1参照）
```

### Heading トークン (Tier 3)

```
heading.text.color            - テキスト色（Tier2参照）
heading.accent.{width|height|radius|gap|color} - アクセントバー
```

**Typography は Tier 2 を直接参照:**
```
typography.heading.{xl|lg|md|sm}.{font-family|font-size|font-weight|line-height}
```

> ⚠️ Tier 3 への typography エイリアスは Style Dictionary のパス衝突を避けるため見送り

---

## 関連リソース

- Issue #108 (コンポーネント品質レビュー)
- `design-tokens/tier3-component/avatar.json`
- `design-tokens/tier3-component/heading.json`
