---
title: Guidelines
---

> ローディング状態を示すスピナーコンポーネント

## Overview

`pt-spinner`は、データ取得や処理中などのローディング状態をユーザーに視覚的に伝えるためのコンポーネントです。

**適切な使用がUXを向上させます** - 不必要なローディング表示はUXを損なうため、適切な状況でのみ使用することが重要です。

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **長時間の非同期処理（300ms以上）** | 大量データの取得、画像ロードなど |
| **ユーザーアクション後の待機** | フォーム送信後の処理中 |
| **初回ロードが遅い可能性がある画面** | 外部APIに依存する画面 |

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **瞬時に完了する処理（300ms未満）** | スピナーがチラつく | Delayed Loading Pattern |
| **コンテンツが既に画面にある場合** | 一覧性が低下 | Skeleton UI |
| **バックグラウンド処理** | ユーザーが待つ必要がない | 非表示または通知 |

## Delayed Loading Pattern

300ms未満で完了する処理ではスピナーを表示しないことを推奨：

```typescript
// ✅ 良い例: 遅延してからスピナーを表示
const timer = setTimeout(() => this.isLoading = true, 300);
await fetchData();
clearTimeout(timer);
this.isLoading = false;
```

## Accessibility

- `ariaLabel`でスクリーンリーダー向けの説明を設定
- アニメーションは`prefers-reduced-motion`を尊重

## Related Components

- `pt-button`: ボタン内のローディング表示
