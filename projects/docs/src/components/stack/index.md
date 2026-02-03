---
title: Guidelines
---

> Flexboxベースの積み上げレイアウトプリミティブ

## Overview

`pt-stack`は、要素を縦または横に積み上げ、一貫したギャップを適用するレイアウトコンポーネントです。Flexboxを使用し、配置・整列を宣言的に制御できます。

**責務の分離**:
- `pt-stack`: レイアウト構造（方向、ギャップ、配置）
- `pt-surface`: 見た目（背景、枠線、角丸）

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **縦に並べたい要素群** | フォームフィールド、カード内のテキスト群 |
| **横に並べたい要素群** | ボタン群、アイコン+テキスト |
| **レスポンシブレイアウト** | モバイルは縦、デスクトップは横 |
| **一貫したギャップが必要** | Design Tokensに基づくスペーシング |

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **グリッドレイアウト** | n列の規則正しい配置はGridの責務 | `pt-grid` |
| **単一要素** | Stackの意味がない | 直接スタイル |
| **複雑なネスト** | 可読性が下がる | 適切なセクション分割 |

---

## Direction 選択ガイド

| 方向 | 用途 |
|------|------|
| `column` | **縦積み**（デフォルト）。フォーム、カード内コンテンツ |
| `row` | **横並び**。ボタン群、アイコン+テキスト、ナビゲーション |

### 使用例

```html
<!-- 縦積み（デフォルト） -->
<pt-stack direction="column" gap="md">
  <pt-heading [level]="2">タイトル</pt-heading>
  <pt-text>説明文...</pt-text>
  <pt-button>アクション</pt-button>
</pt-stack>

<!-- 横並び -->
<pt-stack direction="row" gap="sm" align="center">
  <pt-icon [src]="iconPath" size="sm"></pt-icon>
  <pt-text>ラベル</pt-text>
</pt-stack>
```

---

## Gap 選択ガイド

| サイズ | 値 | 用途 |
|--------|------|------|
| `none` | 0 | ギャップなし |
| `xs` | 4px | 密接した要素 |
| `sm` | 8px | コンパクトなレイアウト |
| `md` | 16px | 標準（デフォルト） |
| `lg` | 24px | ゆったりしたレイアウト |
| `xl` | 32px | セクション間の大きな間隔 |

---

## Align / Justify 選択ガイド

### Align（交差軸方向の配置）

| 値 | 用途 |
|----|------|
| `stretch` | 子要素を伸ばす（デフォルト） |
| `start` | 上/左揃え |
| `center` | 中央揃え |
| `end` | 下/右揃え |

### Justify（主軸方向の配置）

| 値 | 用途 |
|----|------|
| `start` | 先頭揃え（デフォルト） |
| `center` | 中央揃え |
| `end` | 末尾揃え |
| `between` | 両端揃え（間に均等スペース） |

```html
<!-- 中央揃えの横並び -->
<pt-stack direction="row" align="center" justify="between">
  <pt-text>左</pt-text>
  <pt-button>右</pt-button>
</pt-stack>
```

---

## pt-grid との使い分け

| 判断基準 | 選択 |
|----------|------|
| 縦/横の一列配置 | `pt-stack` |
| 規則的なn列配置 | `pt-grid` |
| 柔軟な配置制御 | `pt-stack` |
| 均等幅のカード並べ | `pt-grid` |

---

## Accessibility

- スタック自体にはARIA属性不要
- 内包要素の順序がDOMの順序と一致することを確認

## Related Components

- `pt-grid`: 規則的なグリッドレイアウト
- `pt-surface`: 背景・枠線などのコンテナスタイリング
