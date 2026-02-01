# pt-card

カードコンポーネント。関連するコンテンツをグループ化して表示するコンテナ。

## 使用例

### 基本的な使い方

```html
<pt-card>
  <p>カードの内容</p>
</pt-card>
```

### Compound Card（複合カード）

```html
<pt-card>
  <pt-card-header>タイトル</pt-card-header>
  <pt-card-content>
    <p>カードの本文</p>
  </pt-card-content>
  <pt-card-footer>
    <pt-button>アクション</pt-button>
  </pt-card-footer>
</pt-card>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `elevation` | `'flat' \| 'raised' \| 'floating'` | `'raised'` | 影の深さ |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 内側の余白 |

## Compound Components

### pt-card-header
カードのヘッダー部分。タイトルやサブタイトルを配置。

### pt-card-content
カードのメインコンテンツ領域。

### pt-card-footer
カードのフッター部分。アクションボタンなどを配置。

## バリエーション

### Flat
影なし。背景色のみで区別。

### Raised（デフォルト）
軽い影。一般的なカード。

### Floating
深い影。モーダルやドロップダウンに近い表現。

## アンチパターン

❌ **避けるべき**:
- カード内にカードをネスト（情報階層が複雑になる）
- 1つのカードに過剰な情報を詰め込む

✅ **推奨**:
- 1カード1責務
- 関連するアクションはfooterにまとめる

## 関連コンポーネント

- `pt-button` - カード内のアクションボタン
- `pt-surface` - より軽量な背景コンテナ
