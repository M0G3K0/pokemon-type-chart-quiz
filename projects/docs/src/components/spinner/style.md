---
title: Style
route: style
---

## Design Tokens

`pt-spinner`は以下のデザイントークンを使用します。




<!-- @auto-generated:token-table:start -->
### Size

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `sm` | `--pt-spinner-size-sm` | `{space.40}` | 16px | 小サイズ (16px)。インライン、ボタン内のローディングに使用。 |
| `md` | `--pt-spinner-size-md` | `{space.100}` | 40px | 中サイズ (40px)。標準的なローディング表示に使用。 |
| `lg` | `--pt-spinner-size-lg` | `{space.160}` | 64px | 大サイズ (64px)。フルスクリーンローディングに使用。 |

### Border Width

| Key | Token | Value | Description |
|------|------|------|------|
| `sm` | `--pt-spinner-border-width-sm` | 2px | 小サイズ時のボーダー幅。 |
| `md` | `--pt-spinner-border-width-md` | 3px | 中サイズ時のボーダー幅。 |
| `lg` | `--pt-spinner-border-width-lg` | 4px | 大サイズ時のボーダー幅。 |

### Color

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `primary` | `--pt-spinner-color-primary` | `{color.text.primary}` |  | プライマリカラー。デフォルトのスピナー色。 |
| `secondary` | `--pt-spinner-color-secondary` | `{color.text.secondary}` |  | セカンダリカラー。控えめなスピナー色。 |
| `track` | `--pt-spinner-color-track` |  | rgba(0, 0, 0, 0.1) | トラック色。ドーナツ状スピナーの背景リング。 |

### Animation

| Key | Token | Value | Description |
|------|------|------|------|
| `duration` | `--pt-spinner-animation-duration` | 0.8s | 1回転にかかる時間。 |
<!-- @auto-generated:token-table:end -->
## Visual Design

### ドーナツ形状

Phase 3 で、スピナーの形状が **1/4円弧（イチョウ型）** から **ドーナツ型（全円 + トラック）** に変更されました。

- **トラック**: 薄いグレーの背景リング（`--pt-spinner-color-track`）
- **インジケーター**: 回転する色付きセグメント（primary/secondary）

この変更により、ローディング進捗がより分かりやすくなりました。

---

## Usage Guidelines

### Skeleton UI との使い分け

| シチュエーション | 推奨UI |
|------------------|--------|
| コンテンツの形がわかっている | Skeleton |
| 処理時間が不明・長い | Spinner |
| 部分的な更新 | インラインSpinner |

---

## Related Tokens

- `design-tokens/tier3-component/spinner.json`: コンポーネントトークン定義
