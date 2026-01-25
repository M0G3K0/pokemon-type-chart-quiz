# コンポーネント構成ファイル完全性チェックのガードレール追加

## 📋 概要

Angularコンポーネントが必須ファイル（html/scss/ts/spec.ts）をすべて含んでいることを強制するガードレールを追加する。

## 🔍 背景

現状、コンポーネントを作成する際に以下のファイルが必要だが、強制する仕組みがない：
- `*.ts` - Component class
- `*.html` - Template (インラインテンプレートの場合は除外)
- `*.scss` - Styles (インラインスタイルの場合は除外)
- `*.spec.ts` - Test spec

今回の`pt-chip`実装時に、一部ファイルが不足していても気づかず進めてしまった。

## ✅ やりたいこと

### ガードレールの実装

**配置場所**: `guards/code-quality/component-structure.rules.js`

**チェック内容**:
1. `src/app/ui/pt-*` 配下の各コンポーネントディレクトリを検証
2. 以下のファイルが揃っているか確認：
   - `pt-{name}.ts`
   - `pt-{name}.html` OR インラインテンプレート（`templateUrl`がない）
   - `pt-{name}.scss` OR インラインスタイル（`styleUrls`がない）
   - `pt-{name}.spec.ts`
3. 不足しているファイルがあればエラーを報告

**例外処理**:
- インラインテンプレート/スタイルを使用している場合は、対応するhtml/scssファイルは不要
- `@Component`デコレータ内の`templateUrl`, `styleUrls`の有無で判定

### CI統合

`package.json`に追加:
```json
{
  "scripts": {
    "guards:component-structure": "node guards/code-quality/component-structure.rules.js"
  }
}
```

`.github/workflows/pr-validation.yml`の`Guardrails check`ステップに追加:
```yml
- name: Guardrails check
  run: |
    npm run guards:validate
    npm run guards:component-structure
```

## 📝 実装例

```javascript
// guards/code-quality/component-structure.rules.js
const fs = require('fs');
const path = require('path');

const UI_DIR = path.join(__dirname, '../../src/app/ui');

// pt-*コンポーネントディレクトリを探索
// 各ディレクトリで必須ファイルの存在を確認
// インラインテンプレート/スタイルの場合は除外
// 不足があればエラーとして報告
```

## 🎯 期待される効果

- コンポーネント作成時のファイル不足を防止
- テストファイルの作成を強制（テストカバレッジ向上）
- コードレビュー時の確認項目を削減

## 🔗 関連

- `/component` ワークフロー
- 既存の`guards/code-quality/` ディレクトリ
