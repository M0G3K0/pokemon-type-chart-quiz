---
title: API
route: api
---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | チップのサイズ |
| `bgColor` | `string \| undefined` | - | 背景色（CSS変数または色コード） |
| `textColor` | `string` | `'var(--pt-color-text-inverse)'` | テキスト色（CSS変数または色コード） |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'full'` | `'md'` | 角の丸み |
| `icon` | `string \| undefined` | - | 左側に表示するアイコンのパス |
| `iconSize` | `'sm' \| 'md' \| 'lg' \| undefined` | - | アイコンサイズの上書き（未指定時は`size`に応じて自動調整） |
| `trailingIcon` | `string \| undefined` | - | 右側に表示するアイコンのパス |
| `clickable` | `boolean` | `false` | クリック可能状態にするか |
| `removable` | `boolean` | `false` | 削除ボタン（×）を表示するか |
| `iconOnly` | `boolean` | `false` | アイコンのみモード（正方形チップ） |

## Events

| Event | Type | Description |
|-------|------|-------------|
| `remove` | `EventEmitter<void>` | 削除ボタンがクリックされた時に発火 |

---

## Playground

<!-- TODO: NgDoc Playground設定後に有効化 -->
<!-- {{ NgDocActions.playground("ChipPlaygroundComponent") }} -->

プレイグラウンドはNgDoc設定完了後に利用可能になります。
