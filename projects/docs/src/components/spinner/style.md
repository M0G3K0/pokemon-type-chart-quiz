---
title: Style
route: style
---

## Design Tokens

`pt-spinner`は以下のデザイントークンを使用します。

<!-- @auto-generated:size:start -->
### Size

| Size | Token (Tier 3) | Value | 用途 |
|------|------|------|------|
| `sm` | `--pt-spinner-size-sm` | 16px | インライン、ボタン内のローディングに使用 |
| `md` | `--pt-spinner-size-md` | 40px | 標準的なローディング表示に使用 |
| `lg` | `--pt-spinner-size-lg` | 64px | フルスクリーンローディングに使用 |
<!-- @auto-generated:size:end -->

<!-- @auto-generated:border-width:start -->
### Border Width

| Size | Token (Tier 3) | Value |
|------|------|------|
| `sm` | `--pt-spinner-border-width-sm` | 2px |
| `md` | `--pt-spinner-border-width-md` | 3px |
| `lg` | `--pt-spinner-border-width-lg` | 4px |
<!-- @auto-generated:border-width:end -->

<!-- @auto-generated:color:start -->
### Color

| Visual Attribute | Token (Tier 3) | Reference | 用途 |
|------|------|------|------|
| Primary | `--pt-spinner-color-primary` | `{color.text.primary}` | プライマリカラー。デフォルトのスピナー色。 |
| Secondary | `--pt-spinner-color-secondary` | `{color.text.secondary}` | セカンダリカラー。控えめなスピナー色。 |
| Track | `--pt-spinner-color-track` | `rgba(0, 0, 0, 0.1)` | トラック色。ドーナツ状スピナーの背景リング。 |
<!-- @auto-generated:color:end -->

### Animation

| Property | Token (Tier 3) | Value |
|----------|----------------|-------|
| Duration | `--pt-spinner-animation-duration` | 0.8s |

---

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
