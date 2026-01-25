---
description: コンポーネント実装のE2Eワークフロー（設計〜PR作成まで）
---

# コンポーネント実装ワークフロー

このワークフローは `/component` コマンドで呼び出されます。

## 🚨 重要なルール

### ブランチ戦略

**⚠️ 必読: Quiz画面リファクタリングのブランチ戦略**

`.gemini/plans/quiz-refactor-plan.md` に従い、Quiz画面で使用するコンポーネントは以下のルールで作業する：

1. **作業ブランチ**: `feature/quiz-refactor` （mainから分岐）
2. **個別のPRは作成しない**: 全てのコンポーネント（pt-icon, pt-chip, pt-alert等）を同一ブランチで実装
3. **mainへのマージ**: 全コンポーネント完成後に、`feature/quiz-refactor` → `main` のPRを1つ作成

**理由**:
- コンポーネント間の依存関係がある
- 中途半端な状態でmainを汚したくない
- レビューを一括で行える

### ファイル構成

各コンポーネントは以下のファイル構成で実装（4点セット）：
- `pt-{name}.ts` - Component class
- `pt-{name}.html` - Template
- `pt-{name}.scss` - Styles (Design Tokens使用)
- `pt-{name}.spec.ts` - Unit tests

---

## Step 1: 設計フェーズ

### 1-1: ベンチマーク調査

以下のデザインシステムを参考にする：

| 名前 | URL | 特徴 |
|------|-----|------|
| Material Design 3 | https://m3.material.io/components | Google標準、包括的 |
| GitHub Primer | https://primer.style/components | シンプル、開発者向け |
| SmartHR | https://smarthr.design/products/components/ | 日本語、BtoB向け |
| Adobe Spectrum | https://spectrum.adobe.com/page/components/ | 詳細なアクセシビリティ |

調査ポイント:
- [ ] **命名**: コンポーネント名、Props名の慣習
- [ ] **構成**: Atom / Molecule / Organism のどれか
- [ ] **Props**: 必須/任意、型、デフォルト値
- [ ] **バリアント**: サイズ、色、状態
- [ ] **アクセシビリティ**: ARIA属性、キーボード操作
- [ ] **ユースケース**: When to use / When not to use

### 1-2: 計画ファイル作成

`.gemini/plans/pt-{name}-spec.md` に設計を記載：
- Props定義
- バリアント
- 使用例
- アクセシビリティ考慮

---

## Step 2: 実装フェーズ

### 2-1: ブランチ確認

// turbo
```bash
git branch
```

`feature/quiz-refactor` ブランチにいることを確認。

### 2-2: ファイル作成

```
src/app/ui/pt-{name}/
├── pt-{name}.ts
├── pt-{name}.html
├── pt-{name}.scss
└── pt-{name}.spec.ts
```

### 2-3: Design Tokens使用

SCSSでは必ずDesign Tokensを使用：
```scss
// ✅ Good
padding: var(--pt-space-2);
color: var(--pt-color-text-primary);

// ❌ Bad
padding: 8px;
color: #333;
```

---

## Step 3: 検証フェーズ

// turbo
```bash
npm run lint:css && npm run lint && npm test && npm run build
```

---

## Step 4: ドキュメント作成

`/component-doc` ワークフローに従い、ドキュメントを作成：

```
docs/components/pt-{name}.md
```

必須セクション:
1. Overview
2. When to use ✅
3. When not to use ❌
4. Specs (Props, Events, Tokens)
5. Accessibility
6. Examples
7. Design Patterns
8. Related Components
9. References

---

## Step 5: ゲーム画面リファクタ (必要な場合)

### 対象ファイル

- `src/app/features/quiz/quiz.ts`
- `src/app/features/quiz/quiz.html`
- その他、旧コンポーネントを使用している箇所

### リファクタ手順

1. **Import追加**: 新コンポーネントをimport
2. **テンプレート置換**: 旧コンポーネントを新コンポーネントに置換
3. **旧コンポーネント削除**: 不要になった旧コンポーネントを削除
4. **ビルド確認**: エラーがないことを確認

---

## Step 6: コミット

コンポーネント単位でコミット：

```bash
git add src/app/ui/pt-{name}/ docs/components/pt-{name}.md
git commit -m "feat(ui): add pt-{name} component with docs"
```

**注意**: 個別のPRは作成しない！`feature/quiz-refactor` ブランチに積み重ねる。

---

## Step 7: 全コンポーネント完成後

全てのコンポーネントが完成したら：

1. `feature/quiz-refactor` → `main` のPRを作成
2. レビュー依頼
3. CIパス後にマージ

---

## クイックリファレンス

| ステップ | コマンド/アクション |
|----------|---------------------|
| ベンチマーク | Web検索、デザインシステム調査 |
| 実装 | ファイル作成、コード記述 |
| ドキュメント | `/component-doc` |
| リファクタ | テンプレート置換、旧コンポーネント削除 |
| 確認 | `npm run dev` |
| PR | `/pr` (全コンポーネント完成後のみ) |

---

## 参照

| 内容 | ファイル |
|------|----------|
| **Quiz画面リファクタ計画** | `.gemini/plans/quiz-refactor-plan.md` |
| ドキュメント作成ワークフロー | `.agent/workflows/component-doc.md` |
| ガードレール一覧 | `guards/README.md` |
