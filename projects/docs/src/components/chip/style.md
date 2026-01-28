---
title: Style
route: style
---

## Size Tokens

| Size | Padding | Font Size | 用途 |
|------|---------|-----------|------|
| `sm` | `var(--pt-space-1) var(--pt-space-2)` | `var(--pt-font-size-xs)` | インライン表示、狭いスペース |
| `md` | `var(--pt-space-2) var(--pt-space-3)` | `var(--pt-font-size-sm)` | 標準的な使用（デフォルト） |
| `lg` | `var(--pt-space-3) var(--pt-space-4)` | `var(--pt-font-size-base)` | 強調表示、大きなタッチターゲット |

## Rounded Tokens

| Rounded | Border Radius | 用途 |
|---------|---------------|------|
| `none` | `0` | 直角のスタイル |
| `sm` | `var(--pt-border-radius-sm)` | 軽く丸い角 |
| `md` | `var(--pt-border-radius-md)` | 標準的な丸み（デフォルト） |
| `full` | `9999px` | 完全な丸型（ピル形状） |

## Design Tokens Used

| Property | Token | Description |
|----------|-------|-------------|
| Gap | `var(--pt-space-2)` | アイコンとテキスト間のスペース |
| Font Weight | `var(--pt-font-weight-medium)` | テキストの太さ |
| Transition | `var(--pt-motion-duration-quick)` | ホバー・クリック時のアニメーション速度 |

## Interactive States

| State | Style |
|-------|-------|
| Default | `opacity: 1` |
| Hover (clickable) | `opacity: 0.8` |
| Active (clickable) | `opacity: 0.9` |
| Remove button default | `opacity: 0.7` |
| Remove button hover | `opacity: 1` |
