## 💡 概要

`pt-chip`の`bgColor`プロパティは任意のCSS値を受け付けるため、AIが色を選ぶ際に迷いやすい。より型安全で意図が明確なAPIに改善したい。

## 📝 詳細

### 現状の問題

```typescript
// 現在: 任意のCSS値を受け付ける
[bgColor]="'var(--pt-color-pokemon-fire-500)'"
[bgColor]="'var(--pt-color-gray-600)'"
[bgColor]="'#FF0000'"  // 何でも入る
```

- AIが適切な色を選ぶ際に、全トークンから選択する必要があり迷う
- タイポや存在しないトークン名を指定してもエラーにならない
- 意図が不明確（なぜその色を選んだのか）

### 改善案

#### Option A: Variant Preset Pattern
```typescript
// 定義済みのvariantから選択
[variant]="'primary'"
[variant]="'secondary'"
[variant]="'success'"
[variant]="'danger'"
// bgColor/textColorは内部でvariantから自動解決
```

#### Option B: Semantic Color Type
```typescript
// 許可される色の型を制限
type ChipColor = 'gray' | 'primary' | 'success' | 'warning' | 'danger';
[color]="'gray'"
```

#### Option C: Component Token + Strict Typing
```typescript
// chip.jsonで定義されたトークンのみ許可
// 実行時にトークン存在チェック
```

### 考慮事項

- `pt-type-chip`は既に`type`プロパティでこのパターンを実装済み
- `pt-chip`は汎用コンポーネントなので、ある程度の柔軟性も必要
- デモでの使用を想定すると、意図が明確な方がAIにやさしい

## ✅ やることリスト
- [ ] pt-chipのAPIデザインを再検討
- [ ] variant/colorプロパティの導入を検討
- [ ] bgColor/textColorを非推奨にするか、variantとの併用を許可するか決定
- [ ] 破壊的変更の場合、マイグレーションガイドを作成

## 📷 参考資料（任意）

関連Issue: #94（pt-chipトークンハードコード問題）

参考実装:
- Material UI Chip: `color="primary" | "secondary" | "success" | "error"`
- Chakra UI Tag: `colorScheme="gray" | "red" | "green" | ...`
