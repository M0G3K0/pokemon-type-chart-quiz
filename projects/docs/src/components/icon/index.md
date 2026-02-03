---
title: Guidelines
---

> アイコンを表示するためのAtomコンポーネント

## Overview

`pt-icon`は、SVGや画像ベースのアイコンを統一的に表示するためのAtomレベルのコンポーネントです。サイズ変更が可能で、ポケモンのタイプアイコンなど様々なアイコン表示に使用します。

**主な特徴**:
- **3種類のサイズ**: sm, md, lg
- **3種類のカラー**: default, secondary, disabled
- **装飾的アイコン対応**: デフォルトで`alt=""`が設定されている

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **タイプアイコン** | ポケモンのタイプを視覚的に表示 |
| **状態インジケーター** | 成功/失敗/警告などの状態を表示 |
| **ナビゲーション** | 矢印、メニューアイコン |
| **装飾** | カードやボタンの視覚的アクセント |

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **大量のアイコンを同時表示** | パフォーマンス低下の可能性 | SVGスプライトを検討 |
| **テキストの代替として単独使用** | アクセシビリティ問題 | ラベルや`aria-label`を併用 |
| **複雑なイラスト** | アイコンは簡潔であるべき | `pt-avatar`や`<img>`を使用 |

---

## Size 選択ガイド

| サイズ | 値 | 用途 |
|--------|------|------|
| `sm` | 20px | インラインアイコン、ボタン内、バッジ内 |
| `md` | 32px | 標準的なアイコン表示、カード内 |
| `lg` | 48px | 強調表示、空状態アイコン、ヒーロー |

### 使用例

```html
<!-- インラインアイコン -->
<pt-icon [src]="iconPath" size="sm"></pt-icon>

<!-- 標準的なアイコン -->
<pt-icon [src]="iconPath" size="md"></pt-icon>

<!-- 強調アイコン -->
<pt-icon [src]="iconPath" size="lg"></pt-icon>
```

---

## Color 選択ガイド

| カラー | 用途 |
|--------|------|
| `default` | **標準**。メインコンテンツのアイコン |
| `secondary` | **控えめ**。装飾的な用途、補足情報 |
| `disabled` | **無効状態**。操作不可を示す |

### 使用例

```html
<!-- メインのアイコン -->
<pt-icon [src]="iconPath" color="default"></pt-icon>

<!-- 装飾的なアイコン -->
<pt-icon [src]="iconPath" color="secondary"></pt-icon>

<!-- 無効状態のアイコン -->
<pt-icon [src]="iconPath" color="disabled"></pt-icon>
```

---

## pt-avatar との使い分け

| 判断基準 | 選択 |
|----------|------|
| SVGアイコン（単色） | `pt-icon` |
| 写真・イラスト画像 | `pt-avatar` |
| 色を CSS で制御したい | `pt-icon` |
| ピクセルアート | `pt-avatar` |

---

## Accessibility

- `alt=""`をデフォルトで設定（装飾用アイコンとして扱う）
- 意味のあるアイコンの場合は、親要素に`aria-label`を追加すること

```html
<!-- ✅ 装飾アイコン（ラベルと併用） -->
<pt-type-chip variant="fire">ほのお</pt-type-chip>

<!-- ✅ 意味のあるアイコン（aria-label必須） -->
<button aria-label="閉じる">
  <pt-icon [src]="closeIcon" size="sm"></pt-icon>
</button>
```

## Related Components

- `pt-avatar`: 画像の表示（プロフィール、ポケモン）
- `pt-type-chip`: タイプアイコン+ラベルの複合コンポーネント
