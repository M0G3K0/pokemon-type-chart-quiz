# ポケモンタイプ相性クイズ

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://pokemon-type-chart-quiz.vercel.app)

🎮 **デモ**: https://pokemon-type-chart-quiz.vercel.app

ポケモンのタイプ相性を学べるクイズアプリ。Angular + デザイントークンによるコンポーネント設計。

---

## 開発サーバー

```bash
ng serve
```

ブラウザで `http://localhost:4200/` を開く。ソースファイルを変更すると自動リロードされる。

## ビルド

```bash
ng build
```

成果物は `dist/` に出力される。

## テスト

```bash
ng test
```

テストランナーは [Vitest](https://vitest.dev/)。

---

## プロジェクト構成

```
pokemon-type-chart-quiz/
├── .agent/              # AI エージェント設定（ワークフロー、絵文字定義）
├── .github/             # GitHub 設定（CI/CD、Issue/PR テンプレート）
├── .husky/              # Git Hooks（commit-msg, pre-commit）
├── .vscode/             # VS Code 推奨設定・拡張機能
│
├── design-tokens/       # デザイントークン定義（3層構造）
│   ├── tier1-primitive/   # Tier 1: 原始値（色、スペース）
│   ├── tier2-semantic/    # Tier 2: 意味的トークン（テキスト色、ボーダー）
│   └── tier3-component/   # Tier 3: コンポーネント固有トークン
│
├── docs/                # 一時ドキュメント置き場
│   ├── temp/              # 進行中タスクの計画書
│   └── archive/           # 完了済みドキュメントのアーカイブ
│
├── guards/              # カスタムガードレール（自動品質チェック）
│   ├── architecture/      # アーキテクチャ制約
│   ├── code-quality/      # コード品質
│   ├── design/            # デザイントークン整合性
│   ├── maintenance/       # 保守性
│   ├── meta/              # ガードレール自体の検証
│   ├── process/           # プロセス（Issue/PR フォーマット）
│   ├── ux/                # UX 制約
│   ├── value/             # プロダクト価値
│   └── velocity/          # パフォーマンス
│
├── projects/            # Angular サブプロジェクト
│   └── docs/              # NgDoc ドキュメントサイト
│
├── public/              # 静的アセット（アイコン、データ JSON）
│   ├── icons/             # タイプアイコン SVG
│   └── pokemons.json      # ポケモンデータ
│
├── scripts/             # ビルド・自動化スクリプト
│   ├── ci/                # CI/ローカル検証
│   ├── data/              # データ取得・バリデーション
│   └── tokens/            # デザイントークン生成・同期
│
├── src/                 # アプリケーションソース
│   ├── app/
│   │   ├── core/            # コアサービス（シングルトン）
│   │   ├── domain/          # ドメインロジック（純粋関数）
│   │   ├── features/        # 機能モジュール（画面単位）
│   │   └── ui/              # 汎用 UI コンポーネント（pt-* 系）
│   ├── design-system/
│   │   └── tokens/          # 自動生成 TypeScript 定数（色、スペース等）
│   └── styles/
│       ├── generated/         # 自動生成 CSS/SCSS トークン（Style Dictionary）
│       └── mixins/            # 共通 SCSS ミックスイン
│
└── tmp/                 # 一時ファイル（.gitignore 対象）
```

### 関連ドキュメント

| ファイル | 内容 |
|----------|------|
| `plan.md` | 開発ロードマップ（v0.0〜v1.0） |
| `CONTRIBUTING.md` | 貢献ガイドライン |
| `AGENTS.md` | AI エージェント向け指示書 |
| [`guards/README.md`](./guards/README.md) | ガードレール一覧 |

### 設計原則

**デザイントークン 3 層構造**:
```
Tier 1 (Primitive) → Tier 2 (Semantic) → Tier 3 (Component) → SCSS
```
SCSS は Tier 3 のみ参照（ガードレールで自動検証）。

**アーキテクチャ層**:
```
domain（純粋計算） ← ui（汎用部品） ← features（画面）
```
依存方向は一方向のみ（`dependency-cruiser` で検証）。
