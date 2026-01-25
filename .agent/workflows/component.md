---
description: コンポーネント開発のE2Eワークフロー（ベンチマーク調査からPR/マージまで）
---

# コンポーネント開発ワークフロー

> **概要**: 新規コンポーネントの作成から本番適用まで、一貫したプロセスでデザインシステムを拡張するためのワークフロー。

---

## ワークフロー全体像

```
1. ベンチマーク調査 → 2. 実装 → 3. ドキュメント → 4. リファクタ → 5. 確認 → 6. PR/マージ
```

---

## 1️⃣ ベンチマーク調査 (Research)

### 調査対象のデザインシステム

| 名前 | URL | 特徴 |
|------|-----|------|
| Material Design 3 | https://m3.material.io/components | Google標準、包括的 |
| GitHub Primer | https://primer.style/components | シンプル、開発者向け |
| SmartHR | https://smarthr.design/products/components/ | 日本語、BtoB向け |
| Adobe Spectrum | https://spectrum.adobe.com/page/components/ | 詳細なアクセシビリティ |

### 調査ポイント

- [ ] **命名**: コンポーネント名、Props名の慣習
- [ ] **構成**: Atom / Molecule / Organism のどれか
- [ ] **Props**: 必須/任意、型、デフォルト値
- [ ] **バリアント**: サイズ、色、状態
- [ ] **アクセシビリティ**: ARIA属性、キーボード操作
- [ ] **ユースケース**: When to use / When not to use

### 成果物

- コンポーネント仕様メモ（`.gemini/plans/{component}-spec.md`）

---

## 2️⃣ コンポーネント実装 (Implementation)

### ディレクトリ構成

```
src/app/ui/pt-{component}/
├── pt-{component}.ts       # Component class
├── pt-{component}.html     # Template
├── pt-{component}.scss     # Styles
└── pt-{component}.spec.ts  # Tests (it.todo() stubs)
```

### 実装チェックリスト

- [ ] **Component class**: Props、Events、computed properties
- [ ] **Template**: 条件分岐、ng-content、アクセシビリティ属性
- [ ] **Styles**: Design Tokens使用、BEM命名、バリアント
- [ ] **Tests**: テストスタブ作成（`it.todo()`）

### 命名規則

| 種別 | 命名規則 | 例 |
|------|----------|-----|
| セレクタ | `pt-{name}` | `pt-chip` |
| クラス名 | `{Name}Component` | `ChipComponent` |
| CSSクラス | `.pt-{name}__element--modifier` | `.pt-chip__text--sm` |

### 検証コマンド

```bash
// turbo
npm run build
// turbo
npm run lint
```

---

## 3️⃣ コンポーネントドキュメント作成 (Documentation)

> **参照**: `/component-doc` ワークフローを使用

### 配置先

```
docs/components/pt-{component}.md
```

### 必須セクション

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

## 4️⃣ ゲーム画面リファクタ (Refactor)

### 対象ファイル

- `src/app/features/quiz/quiz.ts`
- `src/app/features/quiz/quiz.html`
- その他、旧コンポーネントを使用している箇所

### リファクタ手順

1. **Import追加**: 新コンポーネントをimport
2. **テンプレート置換**: 旧コンポーネントを新コンポーネントに置換
3. **旧コンポーネント削除**: 不要になった旧コンポーネントを削除
4. **ビルド確認**: エラーがないことを確認

### 検証コマンド

```bash
// turbo
npm run build
// turbo
npm run test
```

---

## 5️⃣ ローカル環境確認 (Verification)

### 起動コマンド

```bash
npm run dev
```

### 確認ポイント

- [ ] コンポーネントが正しく表示される
- [ ] 全サイズバリアントの表示確認
- [ ] インタラクション（hover, click, focus）
- [ ] レスポンシブ対応
- [ ] アクセシビリティ（キーボード操作、スクリーンリーダー）

### 確認完了後

ユーザーに確認を依頼し、許可を待つ。

---

## 6️⃣ PR作成・マージ (Ship)

> **参照**: `/pr` ワークフローを使用

### コミット

```bash
git add -A
git commit -m "feat: implement pt-{component} and integrate into quiz screen

- Add pt-{component}: {brief description}
- Refactor quiz screen to use new component
- Add comprehensive documentation
- Remove deprecated {old-component}"
```

### PR作成

```bash
gh pr create --base {parent-branch} --title "feat: implement pt-{component}" --body-file issue-body.md
```

### マージ

ユーザーの承認後：

```bash
gh pr merge --squash --delete-branch
```

---

## クイックリファレンス

| ステップ | コマンド/アクション |
|----------|---------------------|
| ベンチマーク | Web検索、デザインシステム調査 |
| 実装 | ファイル作成、コード記述 |
| ドキュメント | `/component-doc` |
| リファクタ | テンプレート置換、旧コンポーネント削除 |
| 確認 | `npm run dev` |
| PR | `/pr` |

---

## 関連ワークフロー

- `/component-doc`: コンポーネントドキュメント作成
- `/pr`: Pull Request作成
- `/issue`: GitHub Issue作成
