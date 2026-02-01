<!-- 🛡️ GUARDRAIL -->
<!--
@what  ガードレールファイルの識別バッジ
@why   AIや人間がガードレールファイルを一瞬で識別できるようにするため
@failure  バッジがないファイルはガードレールとして認識されない
-->

# Guards（ガードレール）

AI駆動開発において、アーキテクチャの崩壊を防ぐための静的検査ツール群。

## 概念

### 横のガードレール（非機能）
コードの構造・依存関係を静的に検査して、アーキテクチャの崩壊を防ぐ。

- アーキテクチャ（依存の向き、責務の境界）
- コーディング規約、デザインシステム準拠

### 縦のガードレール（機能）
テスト実行で機能の正しさを検証する。

- E2Eテスト、UIロジックテスト
- ビジネスロジックテスト

---

## @what / @why / @failure パターン

すべてのガードレール・ルールには以下のコメントを付与する：

```typescript
/**
 * @what 何を検査するか（1行で）
 * @why なぜこの検査が必要か（理由）
 * @failure 違反時にどうなるか（結果）
 */
```

### 目的
これは **AIに意図を伝えるためのコメント** です。

AIがルールを修正するとき、この3つがあると「なぜこのルールがあるのか」を理解した上で作業できます。
逆にこれがないと、AIは「とりあえず通るように」修正してしまい、ルールの意図が骨抜きになります。

---

## 🛡️ ガードレール識別バッジ

**これが最初のガードレールです。**

すべてのガードレールファイルは、以下のルールに従う：

### 1. ファイル名サフィックス
```
*.guard.md
```

### 2. ファイル冒頭バッジ
```html
<!-- 🛡️ GUARDRAIL -->
```

### 目的
- AIや人間がガードレールファイルを**一瞬で識別**できるようにする
- grepやファイル検索で全ガードレールを一覧化できる

### 検索方法
```bash
# ファイル名で検索
find guards/ -name "*.guard.md"

# バッジで検索
grep -r "🛡️ GUARDRAIL" guards/
```

---

## ディレクトリ構成

```
guards/
├── README.md                                    # このファイル
├── meta/                                        # メタ憲法
│   ├── guard/
│   │   └── guardrail-format.guard.md            # ドキュメント
│   └── rules/
│       └── guardrail-format.rules.js            # 検証ロジック
├── process/                                     # プロセスの憲法
│   ├── guard/
│   │   └── development-workflow.guard.md        # ドキュメント
│   └── rules/
│       └── development-workflow.rules.js        # ルール定義
├── architecture/                                # 構造の憲法
│   ├── guard/
│   │   └── layer-boundaries.guard.md            # ドキュメント
│   └── rules/
│       └── layer-boundaries.rules.js            # ルール定義
├── code-quality/                                # コード品質の憲法
│   ├── guard/
│   │   ├── coding-standards.guard.md            # コーディング規約
│   │   ├── component-standards.guard.md         # コンポーネント作成標準 (NEW)
│   │   └── component-structure.guard.md         # ファイル構成完全性 (NEW)
│   └── rules/
│       ├── coding-standards.rules.js            # コーディング規約ルール
│       ├── component-standards.rules.js         # コンポーネント標準検査 (NEW)
│       └── component-structure.rules.js         # ファイル完全性検査 (NEW)
├── design/                                      # デザインの憲法
│   ├── guard/
│   │   ├── design-consistency.guard.md          # CSS品質ドキュメント
│   │   ├── no-raw-tailwind.guard.md             # Tailwind直接使用禁止
│   │   ├── tier3-only.guard.md                  # コンポーネントSCSS Tier3専用 (NEW)
│   │   ├── token-existence.guard.md             # トークン存在確認 (NEW)
│   │   └── token-naming.guard.md                # トークン命名規則
│   └── rules/
│       ├── design-consistency.rules.js          # CSS品質ルール
│       ├── no-raw-tailwind.rules.js             # Tailwind検出スクリプト
│       ├── tier3-only.rules.js                  # Tier3専用ルール (NEW)
│       ├── token-existence.rules.js             # トークン存在検査 (NEW)
│       └── token-naming.rules.js                # トークン命名ルール
├── maintenance/                                 # 保守の憲法
│   ├── guard/
│   │   ├── cleanliness.guard.md                 # デッドコード禁止
│   │   ├── duplication.guard.md                 # 重複コード禁止
│   │   └── test-existence.guard.md              # テスト存在必須
│   └── rules/
│       ├── cleanliness.rules.js
│       ├── duplication.rules.json
│       └── test-existence.rules.js
├── velocity/                                    # 速度の憲法
│   ├── guard/
│   │   └── performance.guard.md                 # パフォーマンス基準
│   └── rules/
│       └── performance.rules.js                 # ルール定義
├── ux/                                          # UXの憲法
│   ├── guard/
│   │   └── lazy-loading.guard.md                # 遅延ロード強制
│   └── rules/
│       └── lazy-loading.rules.js                # ルール定義
├── value/                                       # 価値の憲法
│   ├── guard/
│   │   └── analytics.guard.md                   # トラッキング強制
│   └── rules/
│       └── analytics.rules.js                   # ルール定義
└── [今後追加される憲法]/
    ├── guard/
    │   └── *.guard.md
    └── rules/
        └── *.rules.js
```

### ファイルの役割

| ファイル | 役割 |
|----------|------|
| `*.guard.md` | ドキュメント（@what/@why/@failure + ルールへの参照） |
| `*.rules.js` | ソースオブトゥルース（実際のルール定義） |

---

## 憲法一覧

| 憲法 | Philosophy | 状態 |
|------|------------|------|
| メタ憲法 | 自己参照的一貫性 | ✅ Phase 0 |
| プロセスの憲法 | 安全な開発プロセス | ✅ Phase 0 |
| 構造の憲法 | 関心事の分離 | ✅ Phase 2 |
| コード品質の憲法 | 曖昧さの排除 | ✅ Phase 3 |
| デザインの憲法 | 一貫性とアクセシビリティ | ✅ Phase 4 |
| 保守の憲法 | ボーイスカウトのルール | ✅ Phase 5 |
| 速度の憲法 | パフォーマンスは機能の一部 | ✅ Phase 6 |
| UXの憲法 | 認知負荷の最小化 | ✅ Phase 7 |
| 価値の憲法 | ユーザーエンゲージメントの最大化 | ✅ Phase 7 |

---

## 参考資料

- [「横のガードレール」でAIにアーキテクチャを教えるのをやめた話](https://zenn.dev/hideyuki_toyama/articles/horizontal-guard-rails)
- [AIが前提になる時代の、縦と横のガードレール](https://note.com/hideyuki_toyama/n/n24fd932811f5)
