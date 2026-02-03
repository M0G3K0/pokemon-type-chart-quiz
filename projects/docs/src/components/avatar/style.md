---
title: Style
route: style
---

## Design Tokens

`pt-avatar`は以下のデザイントークンを使用します。

### Size

| Visual Attribute | Token (Tier 3) | Primitive Value |
|-----------------|----------------|-----------------|
| sm サイズ | `--pt-avatar-size-sm` | `32px` |
| md サイズ | `--pt-avatar-size-md` | `48px` |
| lg サイズ | `--pt-avatar-size-lg` | `80px` |
| xl サイズ | `--pt-avatar-size-xl` | `120px` |

### Border Radius

| Visual Attribute | Token (Tier 3) | Reference |
|-----------------|----------------|-----------|
| circle (円形) | `--pt-avatar-radius-circle` | `{radius.full}` |
| rounded (角丸) | `--pt-avatar-radius-rounded` | `{radius.lg}` |
| square (小さい角丸) | `--pt-avatar-radius-square` | `{radius.sm}` |

---

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
