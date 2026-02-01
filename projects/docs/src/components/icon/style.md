---
title: Style
route: style
---

## Design Tokens

`pt-icon`は以下のデザイントークンを使用します。

### Size

| Size | Token (Tier 3) | Reference | Value | 用途 |
|------|----------------|-----------|-------|------|
| `sm` | `--pt-icon-size-sm` | `{space.5}` | 20px | インライン、ボタン内 |
| `md` | `--pt-icon-size-md` | `{space.8}` | 32px | 標準的なアイコン表示 |
| `lg` | `--pt-icon-size-lg` | `{space.12}` | 48px | 強調表示、空状態 |

### Color

| Variant | Token (Tier 3) | Reference | 用途 |
|---------|----------------|-----------|------|
| `default` | `--pt-icon-color-default` | `{color.text.primary}` | 標準のアイコン色 |
| `secondary` | `--pt-icon-color-secondary` | `{color.text.secondary}` | 控えめな装飾用 |
| `disabled` | `--pt-icon-color-disabled` | `{color.text.disabled}` | 無効状態 |

---

## アセットパスの動的解決

GitHub Pagesなどサブパスでホストされる環境では、`AssetPathService`を使用してアイコンパスを動的に解決します：

```typescript
import { AssetPathService } from '@app/core/services/asset-path.service';

private readonly assetPath = inject(AssetPathService);

get iconPath(): string {
  return this.assetPath.icon('fire');  // → '/pokemon-type-chart-quiz/icons/fire.svg'
}
```

### PT-Icon での使用

```html
<pt-icon [src]="assetPath.icon('fire')" size="md"></pt-icon>
```

---

## SVG Styling

`pt-icon` はSVGを `mask-image` として使用し、CSSの `color` プロパティでアイコン色を制御します。これにより、親要素からの色継承が自然に機能します。

```scss
.icon-image {
  background-color: currentColor;
  mask-image: url(...);
  mask-size: contain;
}
```

---

## Related Tokens

- `design-tokens/tier3-component/icon.json`: コンポーネントトークン定義
