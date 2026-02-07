# Quiz Screen Refactoring - Revised Implementation Plan

## 概要
Quiz 画面のリファクタリングを Design System First のアプローチで実施します。カスタム実装 (`<span>`, `<div>`) を極力排除し、汎用的な Design System コンポーネント (`pt-*`) で構成されたプロダクトを目指します。

## User Review Required
**IMPORTANT**

以下の設計判断についてご確認ください：

- 不足しているコンポーネント: 洗い出した6つのコンポーネントで十分か
- 優先順位: どのコンポーネントから実装すべきか
- type-badge の扱い: 現在 features 層にあるが、汎用化して ui 層に移動すべきか

### ✅ User Feedback (2026-01-25)

**Q1: 不足しているコンポーネント**
→ 一旦は実装してみないとわからない（今必要なものが不要とわかったり、今は気づいていないが後から必要になるものもある）。とりあえずはこれで大丈夫。

**Q2: 優先順序**
→ どれも同じ feature/quiz-refactor ブランチで作業するため、順番は些細な問題ではない。ただし、コンポーネント同士に依存関係がある（Slot的な）場合は、小さめの方から対応が望まれる。

**Q3: type-badge の扱い**
→ `plan.md` およびガードレール (`guards/architecture/guard/layer-boundaries.guard.md`) に従うべき。

**判断結果:**
- Architecture Constitution に基づき、`ui` 層（汎用コンポーネント）と features 層（機能固有）を明確に分離する
- type-badge は Quiz だけでなくアプリ全体で使われる可能性があるため、`ui` 層に移動して pt-type-badge として汎用化する
- 依存方向: features → ui → domain (逆方向は禁止)

---

## 🎨 Design System Benchmarks

他のデザインシステムを最大限にベンチマークとし、プロジェクト独自の作り方はなるべくしない：

- **Atlassian Design System** - エンタープライズ向けの成熟したシステム
- **GitHub Primer** - シンプルで一貫性のある実装
- **SmartHR Design System** - 日本語UIに最適化
- **Material Design 3** - モダンなコンポーネント設計

各コンポーネントの実装時に、これらのシステムを参考にして Props、バリアント、アクセシビリティ対応を決定する。

---

## Current Analysis: 現在の Quiz UI 構成要素

Quiz 画面を分析した結果、以下の **カスタム実装** が使用されています：

### 1. アイコン表示 (Line 30-35)
```html
<div class="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center shadow-inner"
     [style.background-color]="'var(--color-type-' + attackType() + ')'">
  <img [src]="'/icons/' + attackType() + '.svg'" class="w-6 h-6 brightness-0 invert">
</div>
```
**問題**: カスタム `<div>` + `<img>` で実装されている  
**解決策**: `pt-icon` コンポーネントを作成

### 2. 矢印アイコン (Line 45-49)
```html
<div class="text-slate-200">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
  </svg>
</div>
```
**問題**: SVG が直接記述されている  
**解決策**: `pt-icon` で対応 (アイコンライブラリの整備が必要かも)

### 3. ローディングスピナー (Line 119-122)
```html
<div *ngIf="!currentPokemon()" class="flex flex-col justify-center items-center h-80">
  <div class="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent mb-4"></div>
</div>
```
**問題**: カスタム `<div>` でスピナーを実装  
**解決策**: `pt-spinner` コンポーネントを作成 ✅ **完了**

### 4. フィードバックメッセージ (Line 93-105)
```html
<div *ngIf="isChecked()" class="mb-8 p-6 rounded-3xl animate-in fade-in zoom-in duration-300 border-2" 
     [ngClass]="isCorrect() ? 'bg-secondary/5 border-secondary/20' : 'bg-danger/5 border-danger/20'">
  ...
</div>
```
**問題**: カスタムレイアウトで成功/失敗メッセージを表示  
**解決策**: `pt-alert` コンポーネントを作成

### 5. ポケモン画像 (Line 55-61)
```html
<div class="bg-slate-50 rounded-xl p-1 shadow-inner">
  <img [src]="pokemon.imageUrl" 
       [alt]="pokemon.name"
       class="w-20 h-20 object-contain [image-rendering:pixelated]">
</div>
```
**問題**: カスタム `<div>` で画像を囲んでいる  
**解決策**: 
- `pt-avatar` - 画像表示（サイズ・形状・ピクセルアート対応）のみ担当 ✅ 完了
- `pt-paper` - 背景色・シャドウなどの elevation を担当 (将来追加)

現在の暫定対応: 親要素 `<div>` で装飾を適用

### 6. セクション見出し (Line 75-78)
```html
<p class="text-text-primary font-black text-xl mb-6 flex items-center gap-2">
  <span class="w-1.5 h-6 bg-primary rounded-full"></span>
  わざのダメージ倍率は？
</p>
```
**問題**: カスタム `<p>` + 装飾用 `<span>`  
**解決策**: `pt-heading` コンポーネントを作成 (バー付き見出し)

### 7. タイプバッジ (Line 65-67)
```html
<app-type-badge *ngFor="let t of pokemon.types; let i = index" [type]="t" class="scale-90 origin-left">
  {{ pokemon.jaTypes[i] }}
</app-type-badge>
```
**現状**: `features/quiz/components/type-badge` として実装済み  
**問題**: プロダクト固有の場所 (features) に配置されている  
**解決策**: `pt-type-badge` として `ui` 層に移動するか検討

---

## Proposed Changes

### Phase 1: Design System Component Creation

#### [NEW] pt-icon
**場所**: `src/app/ui/pt-icon/`

**責務**: アイコンの表示（SVG、画像）

**Props**:
- `name?: string` - アイコン名 (SVGライブラリから取得)
- `src?: string` - 画像URL (SVGの代わりに画像を使用する場合)
- `size?: 'sm' | 'md' | 'lg'` - サイズ
- `color?: string` - アイコンの色
- `bgColor?: string` - 背景色 (円形背景を付ける場合)
- `rounded?: boolean` - 背景を円形にするか

**使用例**:
```html
<!-- タイプアイコン -->
<pt-icon 
  [src]="'/icons/fire.svg'" 
  size="md" 
  [bgColor]="'var(--color-type-fire)'"
  [rounded]="true">
</pt-icon>

<!-- 矢印アイコン (将来的にSVGライブラリを導入したら) -->
<pt-icon name="arrow-right" size="lg" color="slate-200"></pt-icon>
```

#### [DONE] pt-spinner ✅
**場所**: `src/app/ui/pt-spinner/`

**責務**: ローディング状態の表示

**Props**:
- `size?: 'sm' | 'md' | 'lg'` - サイズ
- `variant?: 'primary' | 'secondary'` - 色のバリエーション

**使用例**:
```html
<pt-spinner size="lg" variant="primary"></pt-spinner>
```

#### [NEW] pt-alert
**場所**: `src/app/ui/pt-alert/`

**責務**: フィードバックメッセージの表示

**Props**:
- `type: 'success' | 'error' | 'warning' | 'info'` - アラートタイプ
- `title?: string` - タイトル
- `icon?: string` - アイコン (絵文字やSVG)
- `dismissible?: boolean` - 閉じるボタンの有無

**使用例**:
```html
<pt-alert 
  [type]="isCorrect() ? 'success' : 'error'"
  [title]="isCorrect() ? '正解！' : '残念...'"
  [icon]="isCorrect() ? '⭕' : '❌'">
  {{ attackTypeMap[attackType()] }}わざ は {{ pokemon.name }} に対して 
  <strong>{{ actualEffectiveness() }}倍</strong> です
</pt-alert>
```

#### [NEW] pt-avatar
**場所**: `src/app/ui/pt-avatar/`

**責務**: 画像の表示 (プロフィール画像、ポケモン画像など)

**Props**:
- `src: string` - 画像URL
- `alt: string` - 代替テキスト
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - サイズ
- `shape?: 'circle' | 'rounded' | 'square'` - 形状
- `pixelated?: boolean` - ピクセルアート用のレンダリング

**使用例**:
```html
<pt-avatar 
  [src]="pokemon.imageUrl" 
  [alt]="pokemon.name"
  size="lg"
  shape="rounded"
  [pixelated]="true">
</pt-avatar>
```

#### [NEW] pt-heading
**場所**: `src/app/ui/pt-heading/`

**責務**: セクション見出しの表示

**Props**:
- `level: 1 | 2 | 3 | 4 | 5 | 6` - 見出しレベル (h1〜h6)
- `accent?: boolean` - アクセントバーを表示するか
- `accentColor?: string` - アクセントバーの色

**使用例**:
```html
<pt-heading level="3" [accent]="true" accentColor="primary">
  わざのダメージ倍率は？
</pt-heading>
```

#### [CONSIDER] pt-type-badge
**現在**: `src/app/features/quiz/components/type-badge/`

**提案**: `src/app/ui/pt-type-badge/` に移動して汎用化

**Props**:
- `type: PokemonType` - ポケモンのタイプ
- `size?: 'sm' | 'md' | 'lg'` - サイズ

**検討ポイント**:
- タイプバッジはポケモン固有の概念だが、アプリ全体で再利用される
- `pt-badge` を拡張してタイプ専用のバリアントにするか、独立したコンポーネントにするか

---

## Implementation Order

推奨実装順序:

1. ✅ **pt-spinner** (最もシンプル、immediate value) - **完了**
2. ✅ **pt-icon** (幅広く使用される、基本コンポーネント) - **完了**
3. ✅ **pt-chip** (汎用チップコンポーネント) - **完了**
4. ✅ **pt-type-chip** (タイプ別チップ、pt-chipを拡張) - **完了**
5. ✅ **pt-avatar** (画像表示のみ、シンプルに) - **完了**
6. 🔜 **pt-heading** (シンプルだが効果的)
7. 🔜 **pt-alert** (pt-iconに依存)
8. 🔜 **pt-paper** (背景色・シャドウ・elevation担当、MUIのPaper相当)

### pt-paper について

Material UIの[Paper](https://mui.com/material-ui/react-paper/)相当のコンポーネント。
- 背景色（surface）
- シャドウ（elevation）
- 角丸
を統一的に提供する。

**導入理由**: pt-avatarなど他のコンポーネントに背景・シャドウを持たせるのではなく、decorationの責務を分離する。

各コンポーネントは以下の構成で実装:
- `.ts` - ロジック
- `.html` - テンプレート (inline ではなく分離)
- `.scss` - スタイル (Design Tokens を使用)
- `.spec.ts` - ユニットテスト

---

## Verification Plan

### Automated Tests
- `npm run lint` - ESLint チェック
- `npm run test` - 各コンポーネントのユニットテスト
- `npm run build` - ビルド成功確認

### Manual Verification
- Quiz 画面の全機能が正常に動作することを確認
- 新しいコンポーネントが他の画面でも再利用できることを確認
- デザインの一貫性を確認
