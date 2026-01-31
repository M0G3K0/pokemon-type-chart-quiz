---
title: Style
route: style
---

## Design Tokens

`pt-icon`はシンプルなAtomコンポーネントのため、コンポーネント固有のトークンは最小限です。

### Size

| Size | Container | Icon Image | 用途 |
|------|-----------|------------|------|
| `sm` | `--pt-spacing-4` (16px) | `--pt-spacing-3` (12px) | インライン、バッジ内 |
| `md` | `--pt-spacing-12` (48px) | `--pt-spacing-6` (24px) | カード、セクション |
| `lg` | `--pt-spacing-16` (64px) | `--pt-spacing-8` (32px) | ヒーロー、アバター代替 |

---

## Usage Guidelines

### アセットパスの動的解決

GitHub Pagesなどサブパスでホストされる環境では、`AssetPathService`を使用してアイコンパスを動的に解決します：

```typescript
import { AssetPathService } from '@app/core/services/asset-path.service';

private readonly assetPath = inject(AssetPathService);

get iconPath(): string {
  return this.assetPath.icon('fire');  // → '/pokemon-type-chart-quiz/icons/fire.svg'
}
```

---

## Related Tokens

- `design-tokens/tier2-semantic/spacing.json`: サイズ定義
