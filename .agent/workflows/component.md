---
description: コンポーネント実装のE2Eワークフロー（設計〜PR作成まで）
---

# コンポーネント実装ワークフロー

このワークフローは `/component` コマンドで呼び出されます。

## 🚨 重要なルール

### ブランチ戦略

**⚠️ 必読: Quiz画面リファクタリングのブランチ戦略**

```
main
 └── feature/quiz-refactor (親ブランチ)
      ├── feature/quiz-refactor/pt-icon → PR → feature/quiz-refactor
      ├── feature/quiz-refactor/pt-avatar → PR → feature/quiz-refactor
      ├── feature/quiz-refactor/pt-heading → PR → feature/quiz-refactor
      └── ...
 全コンポーネント完成後 → feature/quiz-refactor → main へPR
```

**作業フロー:**
1. **コンポーネントごとにブランチを作成**: `feature/quiz-refactor/pt-{name}`
2. **親ブランチへPR**: `feature/quiz-refactor/pt-{name}` → `feature/quiz-refactor`
3. **全コンポーネント完成後**: `feature/quiz-refactor` → `main` のPRを作成

**理由**:
- コンポーネント単位でレビューできる
- 中途半端な状態でmainを汚さない
- 親ブランチで統合テストできる

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

### 2-1: ブランチ作成

```bash
# 親ブランチを最新化
git checkout feature/quiz-refactor
git pull origin feature/quiz-refactor

# コンポーネント用ブランチを作成
git checkout -b feature/quiz-refactor/pt-{name}
```

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

## Step 6: ローカル確認

```bash
npm run start
```

http://localhost:4200/ でコンポーネントの動作を確認。

---

## Step 7: コミット & プッシュ

```bash
git add src/app/ui/pt-{name}/ docs/components/pt-{name}.md .gemini/plans/pt-{name}-spec.md
git commit -m "feat(ui): add pt-{name} component with docs"
git push origin feature/quiz-refactor/pt-{name}
```

---

## Step 8: PRを作成（親ブランチへ）

```bash
gh pr create --base feature/quiz-refactor --title "✨ feat(ui): add pt-{name} component" --body-file pr-body.md
```

**注意**: PRは `feature/quiz-refactor` ブランチに向ける（mainではない）

---

## Step 9: 全コンポーネント完成後

全てのコンポーネントが完成したら：

1. `feature/quiz-refactor` → `main` のPRを作成
2. レビュー依頼
3. CIパス後にマージ

---

## クイックリファレンス

| ステップ | コマンド/アクション |
|----------|---------------------|
| ブランチ作成 | `git checkout -b feature/quiz-refactor/pt-{name}` |
| ベンチマーク | Web検索、デザインシステム調査 |
| 実装 | ファイル作成、コード記述 |
| 検証 | `npm run lint:css && npm run lint && npm test && npm run build` |
| ドキュメント | `/component-doc` |
| ローカル確認 | `npm run start` |
| PR作成 | `gh pr create --base feature/quiz-refactor` |

---

## 参照

| 内容 | ファイル |
|------|----------|
| **Quiz画面リファクタ計画** | `.gemini/plans/quiz-refactor-plan.md` |
| ドキュメント作成ワークフロー | `.agent/workflows/component-doc.md` |
| ガードレール一覧 | `guards/README.md` |
