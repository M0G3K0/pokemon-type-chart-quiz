---
title: Style
route: style
---

## Design Tokens

`pt-icon`は以下のデザイントークンを使用します。






<!-- @auto-generated:token-table:start -->
### Size

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `xs` | `--pt-icon-size-xs` | `{space.40}` | 16px | コンパクト (16px)。1行に複数の情報要素が並ぶ場面。要素間スペースが8px以下の高密度UI。 |
| `sm` | `--pt-icon-size-sm` | `{space.50}` | 20px | 標準 (20px)。通常のUI。要素間スペースが8-16px。 |
| `md` | `--pt-icon-size-md` | `{space.60}` | 24px | ゆとり (24px)。余白を持たせたUI。要素間スペースが16-24px。 |
| `lg` | `--pt-icon-size-lg` | `{space.80}` | 32px | 強調 (32px)。ユーザーの注意を引きたい単独要素。周囲に24px以上の余白。 |
| `xl` | `--pt-icon-size-xl` | `{space.120}` | 48px | フォーカス (48px)。画面の主役となる単一要素。コンテンツがほぼアイコンのみ。 |

### Color

| Key | Token | Reference | Value | Description |
|------|------|------|------|------|
| `default` | `--pt-icon-color-default` | `{color.text.primary}` |  | デフォルトのアイコン色。`color`に適用。 |
| `secondary` | `--pt-icon-color-secondary` | `{color.text.secondary}` |  | 控えめなアイコン色。装飾的な用途に使用。 |
| `disabled` | `--pt-icon-color-disabled` | `{color.text.disabled}` |  | 無効状態のアイコン色。 |
<!-- @auto-generated:token-table:end -->
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
