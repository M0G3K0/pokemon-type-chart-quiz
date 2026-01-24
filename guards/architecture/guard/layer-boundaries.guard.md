<!-- 🛡️ GUARDRAIL -->

# レイヤー境界ルール

## @what / @why / @failure

```
@what  レイヤー間の依存方向を検査
@why   循環参照やレイヤー逆転を防ぎ、再利用性と保守性を維持するため
@failure  依存違反がある場合、ビルドエラーまたはlintエラーとして検出
```

---

## レイヤー構成

```
src/app/
├── domain/     # ドメイン層（純粋計算・ビジネスロジック）
├── core/       # コア層（汎用UIコンポーネント・共有サービス）
└── features/   # フィーチャー層（画面・機能別モジュール）
```

---

## 依存方向ルール

```
features → core    ✅ 許可
features → domain  ✅ 許可
core → domain      ✅ 許可

core → features    ❌ 禁止
domain → core      ❌ 禁止
domain → features  ❌ 禁止
```

### 図解

```
  features
     ↓
   core
     ↓
  domain
```

依存の方向は常に **上から下へ**（外から内へ）。

---

## 理由

### なぜ `core → features` を禁止するか

`core` は再利用可能なコンポーネントを格納するため、特定の `features` に依存すると再利用性が失われる。

例：`pb-button` コンポーネントが `GameComponent` に依存したら、ゲーム以外の画面で使えなくなる。

### なぜ `domain → core` を禁止するか

`domain` は純粋なビジネスロジックを扱う。UIの詳細（コンポーネント、スタイル）に依存すると、テストが困難になり、ロジックの再利用性が失われる。

---

## 実装

### ルールファイル

**ソースオブトゥルース**: [`layer-boundaries.rules.js`](../rules/layer-boundaries.rules.js)

### 使用方法

```bash
npm run dep-check
```

### 設定ファイル

`.dependency-cruiser.js` がルールファイルをimportして使用。

---

## 違反時の対応

1. `npm run dep-check` でエラーが表示される
2. エラーメッセージで違反ファイルと違反ルールを確認
3. 依存を削除するか、適切なレイヤーにコードを移動

---

## 現状の課題

現在 `domain/` ディレクトリが存在しないため、今後以下を検討：

1. `domain/` ディレクトリを作成し、純粋ロジックを分離
2. または現状の `core/services/` をドメイン層として扱う

---

## 関連

- [Guards README](../../README.md)
- [ルールファイル](../rules/layer-boundaries.rules.js)

