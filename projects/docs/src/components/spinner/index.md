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

---

## Variant 選択ガイド

### Primary

**使用する場面:**
- **メインコンテンツのローディング**
- ユーザーが注視している領域
- 暗い背景/白い背景どちらでも（高コントラスト）

**使用しない場面:**
- 装飾的・控えめな用途

```html
<!-- ✅ 良い例: メインコンテンツのローディング -->
<pt-spinner variant="primary" size="lg"></pt-spinner>
```

### Secondary

**使用する場面:**
- **サブ領域・補助的なローディング**
- メインコンテンツと競合させたくない場合
- 既に他のローディング表示がある画面

**使用しない場面:**
- ユーザーの注目を集めたい場合（視認性が低い）

```html
<!-- ✅ 良い例: サイドバーの部分ローディング -->
<pt-spinner variant="secondary" size="sm"></pt-spinner>
```

---

## Size 選択ガイド

| サイズ | 値 | 用途 |
|--------|------|------|
| `sm` | 16px | ボタン内インジケーター、インラインローディング |
| `md` | 40px | カードやセクション内のローディング |
| `lg` | 64px | フルスクリーンローディング、メインコンテンツ |

### ボタン内ローディング

```html
<pt-button variant="primary" [disabled]="isLoading">
  @if (isLoading) {
    <pt-spinner size="sm" variant="primary"></pt-spinner>
  }
  送信中...
</pt-button>
```

---

## Delayed Loading Pattern

300ms未満で完了する処理ではスピナーを表示しないことを推奨：

```typescript
// ✅ 良い例: 遅延してからスピナーを表示
const timer = setTimeout(() => this.isLoading = true, 300);
await fetchData();
clearTimeout(timer);
this.isLoading = false;
```

---

## Accessibility

- `ariaLabel`でスクリーンリーダー向けの説明を設定
- アニメーションは`prefers-reduced-motion`を尊重

## Related Components

- `pt-button`: ボタン内のローディング表示
