# pt-button

ボタンコンポーネント。アクションの実行を促すUIに使用する。

## 使用例

```html
<pt-button variant="primary" size="md">送信</pt-button>
<pt-button variant="danger" size="sm" [disabled]="true">削除</pt-button>
```

## プロパティ

| プロパティ | 型 | デフォルト | 説明 |
|-----------|-----|----------|------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | ボタンの色バリエーション |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | ボタンのサイズ |
| `disabled` | `boolean` | `false` | 無効状態 |

## イベント

| イベント | 型 | 説明 |
|---------|-----|------|
| `buttonClick` | `MouseEvent` | クリック時に発火（disabled時は発火しない） |

## バリエーション

### Primary（デフォルト）
主要なアクション。1画面に1つが理想。

### Secondary
補助的なアクション。キャンセルや戻るなど。

### Danger
破壊的なアクション。削除やリセットなど。

### Ghost
控えめなアクション。リンク的な振る舞い。

## アンチパターン

❌ **避けるべき**:
- 1画面にPrimaryボタンを複数配置
- ボタンテキストに「ここをクリック」などの曖昧な表現

✅ **推奨**:
- 動詞で始まる明確なラベル（「送信する」「削除する」）
- 適切なバリエーションの選択

## 関連コンポーネント

- `pt-card` - カード内のアクションボタンとして使用
