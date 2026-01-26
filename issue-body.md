> ⚠️ **タイトルは英語で書いてください** (`feat: xxx`, `fix: xxx`, `chore: xxx` 等)

## 💡 概要

Angular の非推奨ディレクティブ構文（`*ngIf`, `*ngFor` 等）を新しい制御フロー構文（`@if`, `@for` 等）に移行し、ガードレールで強制する。

**背景**:
- Angular 17+ で新しい制御フロー構文 (`@if`, `@for`, `@switch`) が導入された
- 従来の `*ngIf`, `*ngFor`, `*ngSwitch` は非推奨（将来的に削除される可能性）
- 新構文はテンプレートのパフォーマンスと可読性が向上

## 📝 詳細

### Phase 1: 調査
非推奨ディレクティブの一覧と新構文への対応表を作成:

| 非推奨 | 新構文 | 備考 |
|--------|--------|------|
| `*ngIf` | `@if` | `else` も `@else` に |
| `*ngFor` | `@for` | `trackBy` → `track` |
| `*ngSwitch` | `@switch` | |
| `[ngClass]` | `[class]` / `@if` | 条件付きクラスの場合 |

### Phase 2: ガードレール作成
ESLint ルールを追加して、非推奨構文の使用を検出:
- `@angular-eslint/template/prefer-control-flow` (Angular ESLint v17+)

### Phase 3: リファクタリング
既存コードを新構文に移行。

## ✅ やることリスト
- [ ] Angular 17+ 制御フロー構文の調査と対応表作成
- [ ] `/guard` でガードレールを作成（ESLint ルール追加）
- [ ] CI で新構文を強制（lint エラー化）
- [ ] 既存コードのリファクタリング（`*ngIf` → `@if` 等）
- [ ] ドキュメント更新

## 📷 参考資料（任意）

- [Angular Built-in Control Flow](https://angular.dev/guide/templates/control-flow)
- [Angular ESLint prefer-control-flow](https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin-template/docs/rules/prefer-control-flow.md)
