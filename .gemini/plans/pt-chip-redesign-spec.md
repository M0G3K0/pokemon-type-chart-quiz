# pt-chip コンポーネント仕様書（再設計案）

## 背景・課題

現在、タイプを表示するために3つの類似コンポーネントが存在し、責任と用途が曖昧：

### 現在の実装
1. **`pt-type-icon`** - 円形背景付きアイコン（今回実装したもの）
   - 用途: タイプアイコンを円形背景で表示
   - Props: `type`, `size`
   - 構成: Icon + 円形背景

2. **`app-type-badge`** - タイプ名テキスト表示
   - 用途: ポケモン名の下にタイプ名をバッジで表示
   - Props: `type`, `size`
   - 構成: テキストのみ（pt-badgeをラップ）

3. **`pt-badge`** - 汎用バッジ
   - 用途: 汎用的なラベル・タグ表示
   - Props: `color`, `customColor`, `size`
   - 構成: テキスト（ng-content）

### 問題点
- **責任の重複**: タイプの視覚表現が分散している
- **使い分けの曖昧さ**: アイコン版とテキスト版が共存し、どちらを使うべきか不明確
- **拡張性の欠如**: アイコン+テキストの組み合わせができない
- **命名の不一致**: `type-icon` という名前だが、実際は背景付きコンテナ

---

## 実装方針

### 現在のコミット状況
- ✅ `pt-icon` (汎用アイコン、Atom) - **完成・コミット済み**
- ✅ `pt-type-icon` (タイプアイコン、Molecule) - **参考実装として保持**
  - `pt-chip` 実装時の参考として残す
  - 最終的には `pt-type-chip` に置き換えられる予定

### ブランチ戦略
- **現在のブランチ**: `feat/pt-icon`
- **継続方針**: 同じブランチで `pt-chip` と `pt-type-chip` も実装
  - ブランチ名は変更しない（最終的なPRタイトルで調整）
  - 1つのPRで Atom → Molecule → Semantic の流れを示す

### 理由
- `pt-icon` は汎用的なAtomとして必要
- `pt-type-icon` は設計の学びを含むため、削除せず参考として保持
- 段階的に実装を進めることで、レビュー時の理解を助ける

---

## 提案: `pt-chip` コンポーネントへの統合

Material Design 3や他のデザインシステムにおける「Chip」の概念を導入：
- **Chip**: 小さな情報単位を視覚的に表現するコンポーネント
- **柔軟な構成**: Icon + Text, Icon のみ, Text のみ、全て対応

### 参考: 他のデザインシステム
- **Material Design 3**: [Chips](https://m3.material.io/components/chips/overview)
  - Assist chips, Filter chips, Input chips, Suggestion chips
  - アイコン（左）+ テキスト + アイコン（右、削除用など）
  
- **GitHub Primer**: [Labels](https://primer.style/components/label)
  - シンプルなテキストラベル
  - アイコン付きバリアント
  
- **SmartHR**: [Tag](https://smarthr.design/products/components/tag/)
  - 削除可能なタグ
  - アイコン + テキスト

---

## pt-chip の仕様案

### Atomic Design上の位置づけ
- **Atom**: `pt-icon` (純粋なアイコン表示)
- **Molecule**: `pt-chip` (アイコン + テキスト + スタイリング)
- **Organism**: `pt-type-chip` (Pokemon Type専用のSemantic Wrapper)

### pt-chip の Props

```typescript
@Component({
  selector: 'pt-chip',
  // ...
})
export class ChipComponent {
  /** チップのサイズ */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  /** 背景色（CSS variable または色コード） */
  @Input() bgColor?: string;
  
  /** テキスト色（CSS variable または色コード） */
  @Input() textColor?: string = 'var(--pt-color-text-inverse)';
  
  /** 角の丸み */
  @Input() rounded: 'none' | 'sm' | 'md' | 'full' = 'md';
  
  /** アイコン（左側） */
  @Input() icon?: string; // アイコンのパスまたは名前
  
  /** アイコンのサイズ調整 */
  @Input() iconSize?: 'sm' | 'md' | 'lg';
  
  /** トレーリングアイコン（右側、削除ボタンなど） */
  @Input() trailingIcon?: string;
  
  /** クリック可能か */
  @Input() clickable: boolean = false;
  
  /** 削除可能か（×ボタン表示） */
  @Input() removable: boolean = false;
  
  /** 削除イベント */
  @Output() remove = new EventEmitter<void>();
}
```

### テンプレート構成

```html
<div class="pt-chip" [class.pt-chip--clickable]="clickable">
  <!-- Leading Icon -->
  <pt-icon *ngIf="icon" [src]="icon" [size]="iconSize"></pt-icon>
  
  <!-- Text Content -->
  <span class="pt-chip__text">
    <ng-content></ng-content>
  </span>
  
  <!-- Trailing Icon (optional) -->
  <pt-icon *ngIf="trailingIcon" [src]="trailingIcon" size="sm"></pt-icon>
  
  <!-- Remove Button (optional) -->
  <button *ngIf="removable" (click)="remove.emit()" class="pt-chip__remove">
    <pt-icon src="/icons/close.svg" size="sm"></pt-icon>
  </button>
</div>
```

### スタイルバリアント

```scss
.pt-chip {
  display: inline-flex;
  align-items: center;
  gap: var(--pt-space-2);
  
  // Size variants
  &--sm {
    padding: var(--pt-space-1) var(--pt-space-2);
    font-size: var(--pt-font-size-xs);
  }
  
  &--md {
    padding: var(--pt-space-2) var(--pt-space-3);
    font-size: var(--pt-font-size-sm);
  }
  
  &--lg {
    padding: var(--pt-space-3) var(--pt-space-4);
    font-size: var(--pt-font-size-base);
  }
  
  // Rounded variants
  &--rounded-none { border-radius: 0; }
  &--rounded-sm { border-radius: var(--pt-border-radius-sm); }
  &--rounded-md { border-radius: var(--pt-border-radius-md); }
  &--rounded-full { border-radius: 9999px; }
  
  // Clickable state
  &--clickable {
    cursor: pointer;
    transition: opacity 0.2s;
    
    &:hover {
      opacity: 0.8;
    }
  }
}
```

---

## 使用例

### 1. タイプアイコンのみ（現在のpt-type-iconと同等）

```html
<pt-chip 
  [icon]="'/icons/fire.svg'"
  [bgColor]="'var(--pt-color-pokemon-fire-500)'"
  rounded="full"
  size="md">
</pt-chip>
```

### 2. タイプ名テキスト（現在のtype-badgeと同等）

```html
<pt-chip 
  [bgColor]="'var(--pt-color-pokemon-fire-500)'"
  rounded="md"
  size="sm">
  ほのお
</pt-chip>
```

### 3. アイコン + テキスト（新機能）

```html
<pt-chip 
  [icon]="'/icons/fire.svg'"
  [bgColor]="'var(--pt-color-pokemon-fire-500)'"
  rounded="full"
  size="md">
  ほのお
</pt-chip>
```

### 4. 削除可能なタグ

```html
<pt-chip 
  [bgColor]="'var(--pt-color-slate-200)'"
  [textColor]="'var(--pt-color-text-primary)'"
  [removable]="true"
  (remove)="onRemove()"
  size="sm">
  フィルタ
</pt-chip>
```

---

## pt-type-chip (Semantic Wrapper)

Pokemon Type専用のラッパーコンポーネント：

```typescript
@Component({
  selector: 'pt-type-chip',
  template: `
    <pt-chip
      [icon]="showIcon ? iconPath : undefined"
      [bgColor]="bgColor"
      [rounded]="rounded"
      [size]="size">
      <ng-content></ng-content>
    </pt-chip>
  `
})
export class TypeChipComponent {
  @Input({ required: true }) type!: PokemonType;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() showIcon: boolean = false;
  @Input() rounded: 'none' | 'sm' | 'md' | 'full' = 'md';
  
  get iconPath(): string {
    return `/icons/${this.type}.svg`;
  }
  
  get bgColor(): string {
    return `var(--pt-color-pokemon-${this.type}-500)`;
  }
}
```

### 使用例

```html
<!-- アイコンのみ -->
<pt-type-chip [type]="'fire'" [showIcon]="true" rounded="full"></pt-type-chip>

<!-- テキストのみ -->
<pt-type-chip [type]="'fire'">ほのお</pt-type-chip>

<!-- アイコン + テキスト -->
<pt-type-chip [type]="'fire'" [showIcon]="true">ほのお</pt-type-chip>
```

---

## 移行計画

### Phase 1: pt-chip の実装
- [ ] pt-chip コンポーネントの基本実装
- [ ] サイズ、rounded、色のバリアント
- [ ] アイコン対応（leading/trailing）
- [ ] ドキュメント作成

### Phase 2: pt-type-chip の実装
- [ ] pt-type-chip (Semantic Wrapper) の実装
- [ ] Pokemon Type専用のロジック統合
- [ ] ドキュメント作成

### Phase 3: 既存コンポーネントの置き換え
- [ ] Quiz画面のpt-type-iconをpt-type-chipに置き換え
- [ ] Quiz画面のapp-type-badgeをpt-type-chipに置き換え
- [ ] 旧コンポーネントの削除

### Phase 4: pt-badgeの再評価
- [ ] pt-badgeの用途を再定義（Chip以外の用途があるか検討）
- [ ] 必要に応じてpt-labelなど、別の命名を検討

---

## まとめ

**統合のメリット:**
1. ✅ **一貫性**: タイプの視覚表現が1つのコンポーネントに集約
2. ✅ **柔軟性**: アイコン、テキスト、両方の組み合わせに対応
3. ✅ **保守性**: 仕様変更が1箇所で完結
4. ✅ **業界標準**: Material Design 3のChipパターンに準拠
5. ✅ **拡張性**: 削除ボタン、クリック可能状態など、将来の機能追加が容易

**次のステップ:**
新しいチャットで、この仕様書をベースに `pt-chip` と `pt-type-chip` を実装する。
