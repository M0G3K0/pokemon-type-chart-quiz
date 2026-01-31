---
title: Style
route: style
---

## Design Tokens

`pt-spinner`はシンプルなAtomコンポーネントです。

### Size

| サイズ | 用途 |
|--------|------|
| `sm` | ボタン内、インラインローディング |
| `md` | カードやセクション内 |
| `lg` | 全画面ローディング、メインコンテンツエリア |

### Variant

| Variant | 用途 |
|---------|------|
| `primary` | メインカラーでのローディング表示 |
| `secondary` | 控えめなローディング表示 |

---

## Usage Guidelines

### Skeleton UI との使い分け

| シチュエーション | 推奨UI |
|------------------|--------|
| コンテンツの形がわかっている | Skeleton |
| 処理時間が不明・長い | Spinner |
| 部分的な更新 | インラインSpinner |
