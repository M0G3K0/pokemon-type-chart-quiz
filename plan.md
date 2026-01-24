# ポケモン耐性クイズ開発計画書（構造分離版）

## プロジェクトの目標
* **脱・仕様駆動:** ただのバイブコーディングではない、真のAI駆動開発の手法を取り入れる（仕様駆動にならない開発）。
* **大量データ処理:** 大量のデータが入った場合の処理の仕方を学ぶ。
* **Enjoy:** 楽しく作る。

## 前提
* 外山英幸氏の手法（ガードレール・自律駆動）から学び、良いところを積極的に取り入れる。

---

## v0.0: 環境構築と開発基盤

### 【MUST: 憲法とガードレール】
* **構造の憲法 (Architecture Constitution):**
    * **Philosophy:** 「関心事の分離」。ロジックはUIの詳細を知ってはならない。
    * **Guidelines:** `domain`（純粋計算）、`ui`（汎用）、`features`（機能）の3層構造。循環参照禁止。
    * **Implementation:** `dependency-cruiser` (`.dependency-cruiser.js`) で `domain -> ui`、`ui -> features` の依存をエラー化する。
* **コード品質の憲法 (Code Quality Constitution):**
    * **Philosophy:** 「曖昧さの排除」と「統一されたスタイル」。
    * **Guidelines:** `any`型の禁止、マジックナンバーの禁止、未使用コードの排除。
    * **Implementation:**
        * `tsconfig` (strict: true)
        * `angular-eslint` (recommended) (`eslint.config.js`)
        * `Stylelint` (`.stylelintrc.js`) によるCSS/SCSSの品質管理
        * `Knip` (`knip.config.js`) による未使用ファイル・exportの検出
        * `Husky` (`.husky`) + `lint-staged` の導入
        * `.editorconfig` によるエディタ設定の統一
* **ツール・環境の憲法 (Tooling Constitution):**
    * **Guidelines:** 過去の開発資産と同じツールチェーンを使用し、開発体験を統一する。
    * **Implementation:** デプロイ先は `Vercel` (`.vercel`)、AI設定は `.agent`、カスタムガードレールスクリプトは `guards` ディレクトリで管理する。

### 【EXAMPLE: 実装の構想】
* Angular + Tailwind CSS のプロジェクト新規作成。
* 過去プロジェクトのディレクトリ・ファイル構成を再現する：
    * **設定ファイル群:**
        * `.editorconfig`: エディタ設定
        * `.stylelintrc.js`: スタイルリント設定
        * `knip.config.js`: 未使用コード検出設定
        * `lighthouserc.js`: パフォーマンス計測設定
        * `tailwind.config.js` / `postcss.config.js`: デザインシステム設定
    * **ディレクトリ構成:**
        * `.agent` / `AGENTS.md`: AIエージェント設定と指示書
        * `.github`: CI/CD設定
        * `.husky`: Git Hooks設定
        * `.vercel`: Vercelデプロイ設定
        * `.vscode`: 推奨拡張機能等の設定
        * `guards`: カスタムガードレールスクリプト置き場
        * `report`: レポート出力先
* ディレクトリ構造の作成（中身は空でよい）。

---

## v0.1: データ基盤（初代151匹）

### 【MUST: 憲法とガードレール】
* **データの憲法 (Data Integrity Constitution):**
    * **Philosophy:** 「信頼できる唯一の情報源」。
    * **Guidelines:** 実行時の外部API依存排除、不正データの流入防止。
    * **Implementation:** ビルド時にデータを取得・整形するスクリプトの作成。`Zod` によるスキーマ検証（不整合ならビルド失敗）。

### 【EXAMPLE: 実装の構想】
* PokeAPIから初代151匹のデータを取得し、`pokemons.json` を生成する。
* ランダムに1匹選出し、コンソールログにクイズの正解（相性）を表示する機能。

---

## v0.2: UI実装とデザインシステム

### 【MUST: 憲法とガードレール】
* **デザインの憲法 (Design Constitution):**
    * **Philosophy:** 「一貫性とアクセシビリティ」。
    * **Guidelines:** 色・サイズのトークン化。役割による命名。汎用部品と特定部品の分離。
    * **Implementation:** `eslint-plugin-tailwindcss` で設定外クラスを禁止。`Stylelint` (`.stylelintrc.js`) でCSSの正当性をチェック。`ui` 層が `features` 層を import したらエラーにする依存ルール追加。

### 【EXAMPLE: 実装の構想】
* ボタン、カード、バッジ等の汎用コンポーネント（`ui`）。
* 上記を組み合わせたクイズ回答画面（`features`）。
* 色は `primary`, `secondary`, `danger` 等のセマンティックな名前で定義する。

---

## v0.3: ロジック深化（第3世代へ）

### 【MUST: 憲法とガードレール】
* **ロジックの憲法 (Logic Constitution):**
    * **Philosophy:** 「予測可能性と検証可能性」。
    * **Guidelines:** 計算ロジックの純粋関数化。低い複雑度の維持。
    * **Implementation:** 複雑度（Cyclomatic Complexity）の閾値設定。ロジック実装時は「解説作成」→「テスト作成」→「実装」のフローを遵守させる。

### 【EXAMPLE: 実装の構想】
* 「ふゆう」「もらいび」などの特性データの実装。
* 複合タイプのダメージ計算ロジックの実装。
* 第3世代までのデータ拡張。

---

## v0.4: 大量データとUX改善（〜第3世代）

### 【MUST: 憲法とガードレール】
* **UXの憲法 (User Experience Constitution):**
    * **Philosophy:** 「認知負荷の最小化」。
    * **Guidelines:** ヒックの法則（選択肢過多の回避）、即時フィードバック。
    * **Implementation:** AIによる「UX憲法に基づいた画面レビュー」の実施と、改善提案プロセスの実行。

### 【EXAMPLE: 実装の構想】
* 全ポケモン一覧画面（図鑑）の実装。
* （UX憲法違反の例として）300匹をただ並べたリストを作る。
* （改善案の例として）世代別タブ、名前検索、タイプ絞り込み機能の実装。

---

## v0.5: 機能拡張と保守性（〜第5世代）

### 【MUST: 憲法とガードレール】
* **保守の憲法 (Maintainability Constitution):**
    * **Philosophy:** 「ボーイスカウトのルール」。
    * **Guidelines:** DRY原則（コピペ禁止）、コンポーネントの肥大化防止、未使用コードの排除。
    * **Implementation:**
        * `jscpd` (コピー＆ペースト検出) の導入。
        * `Knip` (`knip.config.js`) を実行し、未使用のファイルやexportがあればエラーまたは警告を出す。

### 【EXAMPLE: 実装の構想】
* 第5世代までのデータ拡張。
* クイズの出題範囲設定（オプション画面）。
* 似たような処理が増えてきたらリファクタリングを行う。

---

## v0.6: パフォーマンスチューニング（〜第7世代）

### 【MUST: 憲法とガードレール】
* **速度の憲法 (Performance Constitution):**
    * **Philosophy:** 「パフォーマンスは機能の一部」。
    * **Guidelines:** 初期ロードサイズの制限、レイアウトシフト(CLS)の防止。
    * **Implementation:** `bundlesize` チェック。`Lighthouse CI` (`lighthouserc.js`) によるスコア監視（90点未満で警告）。画像への width/height 属性強制。

### 【EXAMPLE: 実装の構想】
* 第7世代までのデータ拡張。
* 画像の遅延読み込み（Lazy Loading）。
* リストの仮想スクロール（Virtual Scroll）対応。

---

## v0.7: プロダクト価値の向上（〜第9世代）

### 【MUST: 憲法とガードレール】
* **価値の憲法 (Product Value Constitution):**
    * **Philosophy:** 「ユーザーエンゲージメントの最大化」。
    * **Guidelines:** 初心者への配慮、学びの提供。
    * **Implementation:** AIに特定のペルソナ（初心者など）でプレイさせ、フィードバックを出力させるレビュー工程。

### 【EXAMPLE: 実装の構想】
* 第9世代までの完全データ投入。
* 不正解時に「なぜ違うのか」を解説するモーダル表示。
* タイプ相性表の参照機能。

---

## v1.0: リリース

### 【MUST: 憲法とガードレール】
* 定義された全ての憲法（構造・データ・デザイン・ロジック・UX・保守・速度・価値）を遵守し、テストをパスしていること。

### 【EXAMPLE: 実装の構想】
* `Vercel` へのホスティング公開（`.vercel` 設定に基づく）。