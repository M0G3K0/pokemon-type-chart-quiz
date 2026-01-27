# pt-radio-button / pt-radio-group 設計書

## 📋 概要

**コンポーネント名**: `pt-radio-button` / `pt-radio-group`  
**配置**: `src/app/ui/pt-radio-button/`  
**セレクタ**: `pt-radio-button`, `pt-radio-group`  
**種別**: Atom (Design System / 汎用)

### 責務
- 複数の選択肢から **単一の値** を選択する RadioButton パターンを提供
- `input[type="radio"]` と同等のセマンティクスとアクセシビリティを担保
- 検証結果（`correct` / `wrong` など）のフィードバック状態を表現可能
- 選択肢のレイアウト (縦/横/グリッド) を制御

### 非責務
- 複数選択: → Checkbox パターン (将来の `pt-checkbox-group`)
- テキスト入力との連携: → ComboBox パターン
- レイアウト制御: → `pt-radio-group` の `layout` または `pt-grid` / `pt-stack` に委譲

---

## 🎯 ベンチマーク結果サマリ

| デザインシステム | コンポーネント | 主な特徴 |
|-----------------|--------------|---------|
| Material Design 3 | Segmented Button | 即時反映向け（切替UI）、icon+label |
| Primer (GitHub) | SegmentedControl | 横並び、密接な選択肢 |
| SmartHR | RadioButton / RadioButtonPanel | フォーム向け、補足情報付きカード風も可 |

**採用方針**:
- SmartHR の RadioButtonPanel の概念をベースに `pt-radio-button` を設計
- Feedback State (`correct`/`wrong`/`actual`) をデザインシステムの拡張として取り込む

---

## 🛠️ Props 仕様

### pt-radio-button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `T` (generic) | **required** | 選択肢の値。`pt-radio-group` の `value` と比較される。 |
| `disabled` | `boolean` | `false` | 無効状態。クリック不可になる。 |
| `feedbackState` | `'default' \| 'correct' \| 'wrong' \| 'actual'` | `'default'` | フィードバック状態。Quiz等での正解/不正解表示に使用。 |

**アクセシビリティ**:
- `role="radio"` を付与
- `aria-checked` で選択状態を表現
- `aria-disabled` で無効状態を表現
- フォーカス可能 (tabindex)

### pt-radio-group

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | `''` | ラジオボタン群の name 属性。 |
| `value` | `T` | `null` | 現在選択されている値。 |
| `layout` | `'vertical' \| 'horizontal'` | `'vertical'` | 選択肢の配置方向。 |
| `gap` | `'sm' \| 'md' \| 'lg'` | `'md'` | ボタン間の間隔。 |

**Events**:
- `valueChange: EventEmitter<T>` - 選択が変わったときに発火

---

## 🎨 スタイル設計

### Feedback State カラーマッピング

| State | Background | Border | Text |
|-------|------------|--------|------|
| `default` | `--pt-color-surface-card` | `--pt-color-border-default` | `--pt-color-text-primary` |
| `selected` | `--pt-color-gray-800` | `--pt-color-gray-800` | `--pt-color-text-inverse` |
| `correct` | `--pt-color-result-win-default` | `--pt-color-result-win-default` | `--pt-color-text-inverse` |
| `wrong` | `--pt-color-result-lose-default` | `--pt-color-result-lose-default` | `--pt-color-text-inverse` |
| `actual` | `--pt-color-surface-card` | `--pt-color-result-win-default` | `--pt-color-result-win-default` |
| `disabled` | `--pt-color-surface-hovered` | `--pt-color-border-subtle` | `--pt-color-text-disabled` |

### インタラクション

- **hover**: `background: --pt-color-surface-hovered`, border 強調
- **active**: `transform: scale(0.95)`
- **selected**: `transform: scale(1.05)`, `box-shadow: lg`
- **transition**: `all var(--pt-duration-normal) var(--pt-easing-default)`

---

## 📐 レイアウト設計

pt-radio-group の `layout` は CSS Flexbox で実装:

```scss
:host {
  display: flex;
  
  &.layout-vertical {
    flex-direction: column;
  }
  
  &.layout-horizontal {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

**Grid レイアウトが必要な場合**:
- `pt-radio-group` を `<pt-grid>` でラップする
- `layout` prop は使わず、外側でレイアウト制御

```html
<!-- Quiz での使用例: グリッドレイアウト -->
<pt-grid [columns]="2" [smColumns]="3" gap="md">
  <pt-radio-button *ngFor="let choice of choices" [value]="choice" ...>
    ...
  </pt-radio-button>
</pt-grid>
```

---

## 🧩 使用例

### Quiz 画面 (現在のユースケース)

```html
<pt-grid [columns]="2" [smColumns]="3" gap="md">
  <pt-radio-button
    *ngFor="let choice of choices"
    [value]="choice"
    [feedbackState]="getChoiceState(choice)"
    [disabled]="isChecked()"
    (click)="selectChoice(choice)"
  >
    <pt-text variant="body-lg" weight="bold">{{ choice }}</pt-text>
    <pt-text variant="label-xs" color="secondary">倍</pt-text>
  </pt-radio-button>
</pt-grid>
```

### 通常のフォーム (将来の使用例)

```html
<pt-radio-group name="difficulty" [(value)]="selectedDifficulty" layout="horizontal">
  <pt-radio-button [value]="'easy'">かんたん</pt-radio-button>
  <pt-radio-button [value]="'normal'">ふつう</pt-radio-button>
  <pt-radio-button [value]="'hard'">むずかしい</pt-radio-button>
</pt-radio-group>
```

---

## 📁 ファイル構成

```
src/app/ui/pt-radio-button/
├── pt-radio-button.ts       # pt-radio-button コンポーネント
├── pt-radio-group.ts        # pt-radio-group コンポーネント
├── pt-radio-button.scss     # スタイル定義
├── pt-radio-button.spec.ts  # テスト
└── index.ts                  # public API
```

---

## ✅ 受け入れ条件

1. [ ] `pt-radio-button` が `feedbackState` に応じてスタイルが変わる
2. [ ] `pt-radio-group` で `value` の双方向バインディングが動作する
3. [ ] `role="radio"` と `aria-checked` が適切に設定される
4. [ ] キーボード操作 (Tab, Space/Enter) で選択可能
5. [ ] Quiz 画面のリファクタリングで使用され、独自スタイル削減
6. [ ] 単体テストがパスする

---

## 🔗 参照

- **Issue**: [#76 - apply Smart/Dumb pattern](https://github.com/M0G3K0/pokemon-type-chart-quiz/issues/76)
- **既存仕様案**: `C:\Users\hmanako\.gemini\antigravity\knowledge\design_system\artifacts\components\pt-radio-button.md`
- **ベンチマーク**: Material Design 3, Primer, SmartHR Design System
