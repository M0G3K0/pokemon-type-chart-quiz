## 概要 / Summary

`pt-heading` コンポーネントを追加し、Quiz 画面で使用していたカスタム見出し実装を置き換えました。

## 変更内容 / Changes

### 新規追加
- `src/app/ui/pt-heading/` - Heading コンポーネント（Atom）
  - `level` prop: セマンティックな見出しレベル（h1-h6）
  - `size` prop: 視覚的サイズ（xl/lg/md/sm）、levelから自動推論
  - `accent` prop: アクセントバー（左側の縦棒）表示
- `design-tokens/tier3-component/heading.json` - Tier 3 トークン
- `docs/components/pt-heading.md` - コンポーネントドキュメント
- `.gemini/plans/pt-heading-spec.md` - 設計書

### 変更
- `src/app/features/quiz/quiz.ts` - カスタム見出しを `pt-heading` に置き換え
- `style-dictionary.config.mjs` - heading トークンを出力対象に追加

## ベンチマーク / Benchmarks

- [GitHub Primer Heading](https://primer.style/components/heading) - `as` + `size` の分離
- [SmartHR Heading](https://smarthr.design/products/components/heading/) - 用途別の種類分け
- [Adobe Spectrum Heading](https://spectrum.adobe.com/page/heading/) - T-shirt sizing

## テスト / Testing

- [x] `npm run lint:css` - StyleLint パス
- [x] `npm run lint` - ESLint パス
- [x] `npm test` - Vitest パス（todo テスト追加）
- [x] `npm run build` - ビルド成功

## スクリーンショット / Screenshots

ローカル環境で http://localhost:4200 にアクセスし、「わざのダメージ倍率は？」の見出しにアクセントバーが表示されることを確認してください。

## 関連 Issue / Related Issues

Quiz画面リファクタリングの一環（`feature/quiz-refactor` 親ブランチへのPR）
