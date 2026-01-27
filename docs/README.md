# コンポーネントドキュメント

このディレクトリは、デザインシステムコンポーネントのドキュメントを格納します。

> **暫定運用**: 現在は Markdown ファイルで手動管理しています。  
> 将来的に NgDoc を導入し、GitHub Pages でホストする予定です。

---

## 📁 ディレクトリ構成

```
docs/
├── README.md                 # このファイル
└── components/
    └── pt-spinner.md         # 各コンポーネントのドキュメント
```

---

## 📋 コンポーネント一覧

| コンポーネント | ステータス | ドキュメント |
|---------------|-----------|-------------|
| `pt-spinner` | ✅ 実装済み | [pt-spinner.md](./components/pt-spinner.md) |
| `pt-icon` | ✅ 実装済み | [pt-icon.md](./components/pt-icon.md) |
| `pt-button` | ✅ 実装済み | 🔜 作成予定 |
| `pt-badge` | ✅ 実装済み | 🔜 作成予定 |
| `pt-card` | ✅ 実装済み | 🔜 作成予定 |
| `pt-avatar` | 🔜 未実装 | - |
| `pt-heading` | 🔜 未実装 | - |
| `pt-alert` | 🔜 未実装 | - |
| `pt-input` | 🔜 未実装 | - |
| `pt-modal` | 🔜 未実装 | - |
| `pt-toast` | 🔜 未実装 | - |
| `pt-skeleton` | 🔜 未実装 | - |

---

## 🚀 NgDoc 導入計画 (Phase 5)

**Issue**: #42

### 構成方針

1. **配置場所**: `/docs` ディレクトリに NgDoc (Angular) を配置
2. **ホスティング**: GitHub Pages（メインアプリの Vercel と完全分離）
3. **SSOT原則**: JSON内の `$description` から NgDoc へ動的インジェクション

### 予定タスク

| タスク | 詳細 | 状態 |
|--------|------|------|
| `/docs` プロジェクト構成 | NgDoc (Angular) を配置し、本体ビルドと分離 | 🏗️ |
| GitHub Pages設定 | GitHub Actions で自動デプロイ | 🏗️ |
| トークン・ショーケース | JSON の `$description` を直接読み込み | 🏗️ |
| コンポーネントPlayground | 各コンポーネントの対話的デモ | 🏗️ |

### アーキテクチャ

```
pokemon-type-chart-quiz/
├── src/                      # メインアプリ (Vercel)
├── docs/                     # ドキュメントサイト (GitHub Pages)
│   ├── ng-doc/              # NgDoc プロジェクト
│   │   └── src/
│   │       ├── components/  # コンポーネントドキュメント
│   │       └── tokens/      # トークンショーケース
│   └── components/          # 暫定 Markdown ドキュメント
└── design-tokens/            # SSOT: トークン JSON
```

### バンドル分離の理由

- **メインアプリのバジェット保護**: 750KB 制限に影響させない
- **Vercel リソースの節約**: ドキュメントは GitHub Pages で無料ホスト
- **独立したデプロイサイクル**: ドキュメント更新でメインアプリの再デプロイ不要

---

## 📖 ドキュメント作成方法

新しいコンポーネントのドキュメントを作成するには:

```
/component-doc
```

ワークフロー (`/.agent/workflows/component-doc.md`) に従ってください。

---

## 🔗 関連リンク

- [デザインシステム実装計画](../knowledge/design_system/artifacts/implementation_plan.md) ※ Knowledge Item
- [ガードレール一覧](../guards/README.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
