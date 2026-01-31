# Surface, Card, Paper: 責務分離

Issue #68 関連: pt-paper コンポーネントの必要性判断

---

## 決定事項

### 1. pt-paper は導入しない

**決定**: 専用の `pt-paper` コンポーネントは **導入しない**

**理由**:
- 他のデザインシステム（Material 3, GitHub Primer, SmartHR, Atlassian）を調査した結果、`pt-surface` が必要な機能的コンテナ機能（背景、パディング、角丸、基本的なバリアント）を既に提供している
- `Paper` を導入すると不必要な認知負荷とコンポーネントの重複を招き、このプロジェクトのコンテキストでは独自の機能的メリットがない

---

### 2. 責務分離（Surface vs. Card）

この2つのコンテナコンポーネントの曖昧さを解消するため、明確な境界を設けた。

| 観点 | **pt-surface** | **pt-card** |
| :--- | :--- | :--- |
| **主要な役割** | 機能的コンテナ / Box | 意味的情報ユニット |
| **内部構造** | 単一コンテンツエリア | 構造化（Header, Content, Footer） |
| **スタイリング** | 背景、パディング、角丸、ボーダー | Elevation（影）、背景、角丸 |
| **Elevation** | 主にフラット（`default`/`subtle` バリアント経由） | デフォルトでElevation付き（`raised`/`overlay`） |
| **最適な使用法** | セクション背景、グループ化されたフォームフィールド | リスト内の個別アイテム、スタンドアロンの機能コンテナ |

### 使用ガイドライン

```html
<!-- pt-surface: 機能的コンテナとして使用 -->
<pt-surface variant="subtle" padding="lg" radius="xl">
  <form>
    <!-- フォームフィールド群 -->
  </form>
</pt-surface>

<!-- pt-card: 意味的コンテンツユニットとして使用 -->
<pt-card size="md" elevation="raised">
  <pt-card-header>タイトル</pt-card-header>
  <pt-card-content>本文</pt-card-content>
  <pt-card-footer>
    <pt-button>アクション</pt-button>
  </pt-card-footer>
</pt-card>
```

---

### 3. 業界標準との整合性

- **GitHub Primer**: `Box` + `Card` モデルに従う。`pt-surface` はPrimerの `Box` に似た動作だが、デザイントークンベースのバリアントを持つ
- **Material 3**: `Surface` を基本レイヤーとして使用。`pt-card` はそのロジックの上に構築された具体的な実装

---

## Phase 3d 実装詳細

- **パディング調整**: Card の Header/Footer/Content のパディングを Tier3 トークン（`card.json`）に標準化
- **角丸**: `pt-card` の角丸はシステム全体の「Content Surface」標準（`lg` サイズ = 12px）と一致。`pt-surface` は柔軟なまま
- **トークン**: `surface.json` と `card.json`（Tier 3）がすべての視覚的プロパティの信頼できる情報源

---

## 関連リソース

- 監査: `docs/decisions/token-strategy.md` (Section 3.2)
- Issue #108 (コンポーネント品質レビュー)
- Issue #68 (pt-paper 検討 - この決定でクローズ)
