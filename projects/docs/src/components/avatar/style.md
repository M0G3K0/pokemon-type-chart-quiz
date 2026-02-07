---
title: Style
route: style
---

## Design Tokens

`pt-avatar`は以下のデザイントークンを使用します。


<!-- @auto-generated:token-table:start -->
### Size

| Key | Token | Value | Description |
|------|------|------|------|
| `sm` | `--pt-avatar-size-sm` | 32px | 小サイズ。リスト内のアイコンなどに使用。 |
| `md` | `--pt-avatar-size-md` | 48px | 中サイズ。標準的なアバター表示に使用。 |
| `lg` | `--pt-avatar-size-lg` | 80px | 大サイズ。カード内メイン画像などに使用。 |
| `xl` | `--pt-avatar-size-xl` | 120px | 特大サイズ。プロフィール画面などに使用。 |

### Radius

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `circle` | `--pt-avatar-radius-circle` | `{radius.full}` |  | 完全な円形。ユーザーアバター用。 |
| `rounded` | `--pt-avatar-radius-rounded` | `{radius.lg}` |  | 角丸。サムネイル用。 |
| `square` | `--pt-avatar-radius-square` | `{radius.sm}` |  | 小さい角丸。ピクセルアート用。 |
<!-- @auto-generated:token-table:end -->
## Layout Specifications

| Size | Dimensions | Use Case |
|------|------------|----------|
| `sm` | 32×32px | リスト内のアイコン |
| `md` | 48×48px | 標準サイズ |
| `lg` | 80×80px | カード内メイン画像 |
| `xl` | 120×120px | プロフィール画面 |

---

## Shape Variants

| Shape | border-radius | Use Case |
|-------|--------------|----------|
| `circle` | 50% | ユーザーアバター |
| `rounded` | `--pt-radius-lg` | サムネイル |
| `square` | `--pt-radius-sm` | ピクセルアート |

---

## Related Tokens

- `design-tokens/tier3-component/avatar.json`: コンポーネントトークン定義
