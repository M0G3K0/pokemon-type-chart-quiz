# CASPAR-3: 女としての判断

> 「このプロセスは美しい（整っている）か？」
> レイ（零号機 / Process Guard）と冬月（副司令 / Conductor）が照会するナレッジベース。

---

## 1. プロジェクト概要

### What

**ポケモン耐性クイズ** — ポケモンのタイプ相性を学び、クイズで試すWebアプリ。

### Why（プロジェクトの存在意義）

このプロジェクトは単なるクイズアプリではない。**AI駆動開発の手法そのものを学ぶ実験場**。

```
プロジェクトの3つの目標（plan.md より）:
1. 脱・仕様駆動: 真のAI駆動開発の手法を取り入れる
2. 大量データ処理: 大量データの処理を学ぶ
3. Enjoy: 楽しく作る
```

### 技術スタック

| 技術 | 用途 |
|------|------|
| Angular (standalone) | フレームワーク |
| TypeScript (strict) | 言語 |
| SCSS + Design Tokens | スタイリング |
| Vitest | テスト |
| NgDoc | コンポーネントドキュメント |
| Vercel | デプロイ |
| GitHub Actions | CI/CD |
| Gemini CLI | AI駆動開発 |

---

## 2. 憲法体系（Constitution System）

### 原典: plan.md の設計思想

このプロジェクトは「**バージョンごとに憲法を追加していく段階的アプローチ**」で設計されている。
各憲法には **Philosophy（哲学）→ Guidelines（指針）→ Implementation（実装）** の3層がある。

```
v0.0  構造の憲法 + コード品質の憲法 + ツール憲法
v0.1  データの憲法
v0.2  デザインの憲法
v0.3  ロジックの憲法
v0.4  UXの憲法
v0.5  保守の憲法
v0.6  速度の憲法
v0.7  価値の憲法
v1.0  全憲法遵守でリリース
```

### 憲法 → ガードレール 対応表

| 憲法 | Philosophy | guards/ での実現 | Phase |
|------|-----------|-----------------|-------|
| 構造の憲法 | 関心事の分離 | `architecture/` (2件) | ✅ Phase 0 |
| コード品質の憲法 | 曖昧さの排除 | `code-quality/` (4件) | ✅ Phase 3 |
| デザインの憲法 | 一貫性とアクセシビリティ | `design/` (7件) | ✅ Phase 4 |
| 保守の憲法 | ボーイスカウトのルール | `maintenance/` (4件) | ✅ Phase 5 |
| 速度の憲法 | パフォーマンスは機能の一部 | `velocity/` (1件) | ✅ Phase 6 |
| UXの憲法 | 認知負荷の最小化 | `ux/` (1件) | ✅ Phase 7 |
| 価値の憲法 | エンゲージメントの最大化 | `value/` (1件) | ✅ Phase 7 |
| メタ憲法 | 自己参照的一貫性 | `meta/` (1件) | ✅ Phase 0 |
| プロセスの憲法 | 安全な開発プロセス | `process/` (4件) | ✅ Phase 0 |

### NERV における位置づけ

```
plan.md の「憲法」 = guards/ の「ガードレール」 = MAGIシステムのデータソース

MELCHIOR → デザインの憲法 + 構造の憲法
BALTHASAR → コード品質の憲法 + 保守の憲法 + 全ガードレール制約
CASPAR → プロセスの憲法 + プロジェクト全体方針（このファイル）
```

---

## 3. 開発プロセス

### Issue 作成フロー

```
1. issue-body.md を作成（テンプレート: .github/ISSUE_TEMPLATE/task.md に従う）
   必須セクション: 💡 概要, ✅ やることリスト
2. node scripts/validate-issue-local.js で検証
3. gh issue create (絵文字は Node.js spawnSync 経由 — 文字化け防止)
4. gh issue view <number> --json title で絵文字確認
5. node scripts/check-issue-warnings.js <number> で警告確認
```

**ワークフロー**: `.agent/workflows/issue.md`
**ガードレール**: `guards/process/guard/issue-format.guard.md`

### PR 作成フロー

```
1. ブランチを作成（命名: type/issue番号-description）
2. コミット → プッシュ
3. pr-body.md を作成（テンプレート: .github/pull_request_template.md に従う）
   必須セクション: 💡概要, 📝変更内容, 🔗関連Issue, 📷スクリーンショット,
                    ✅チェックリスト, 📌補足事項, 📝PRタイトル命名規則, 📖レビュー用語集
4. npm run pr:validate で検証
5. npm run lint:css + npm test で品質チェック
6. gh pr create (絵文字は Node.js spawnSync 経由)
7. gh pr view --json title で絵文字確認
8. gh pr checks でCI確認
```

**ワークフロー**: `.agent/workflows/pr.md`
**ガードレール**: `guards/process/guard/pr-format.guard.md`

### コミットメッセージ規約（Conventional Commits）

```
type(scope): description

type一覧:
  ✨ feat      新機能
  🩹 fix       バグ修正
  📚 docs      ドキュメント
  🎨 style     スタイル変更
  ♻️ refactor  リファクタリング
  ⚡ perf      パフォーマンス改善
  🧪 test      テスト
  🏗️ build     ビルド
  👷 ci        CI/CD
  🔧 chore     その他
  ⏪ revert    変更を元に戻す
  💥 breaking  破壊的変更
  🚧 wip       作業中
```

**絵文字プレフィックス定義**: `.agent/emoji-prefixes.json`

### ブランチ命名規約

```
feat/issue番号-description
fix/issue番号-description
refactor/issue番号-description
docs/issue番号-description
chore/issue番号-description
```

### 🔴 NERV ブランチ戦略

```
main: 通常の開発。NERV関連はマージしない。
beta/nerv-phase1: NERV Phase 0-1 のお試しブランチ。

マージ条件: Level 2（デュアルエージェント）の技術的フィージビリティ確認後。
不可能な場合: MAGI/ とワークフロー変更のみ cherry-pick を検討。
```

---

## 4. ワークフロー一覧

| コマンド | ファイル | 用途 |
|---------|---------|------|
| `/component` | `.agent/workflows/component.md` | コンポーネント実装（設計〜PR作成） |
| `/component-doc` | `.agent/workflows/component-doc.md` | NgDocドキュメント作成（4タブ構成） |
| `/guard` | `.agent/workflows/guard.md` | ガードレール新規作成 |
| `/issue` | `.agent/workflows/issue.md` | Issue作成 |
| `/pr` | `.agent/workflows/pr.md` | PR作成 |
| `/screen` | `.agent/workflows/screen.md` | 画面（UI）作成 |

---

## 5. 重要なルールと注意事項

### 文字化け防止（🔴 最重要）

Windows 環境での絵文字処理:
- **`--body "..."` で直接本文を書くことは禁止** → `--body-file` を使用
- **絵文字は Node.js spawnSync で取得** → シェル経由を避ける
- **作成後は必ず絵文字の文字化け確認**

### 一時ファイル管理

| ファイル | 用途 | .gitignore |
|---------|------|-----------|
| `issue-body.md` | Issue本文の下書き | ❌ コミットしない |
| `pr-body.md` | PR本文の下書き | ❌ コミットしない |
| `tmp/` | 構想・メモ | ❌ コミットしない |

**ガードレール**: `guards/maintenance/guard/temp-docs.guard.md`

### ガードレール新規作成の手順

1. `.guard.md` を作成（`<!-- 🛡️ GUARDRAIL -->` バッジ + @what/@why/@failure）
2. `.rules.js` を作成（検証ロジック）
3. `package.json` に `guard:{name}` スクリプトを追加
4. `/guard` ワークフローに従う

---

## 6. プロジェクトロードマップ（現在地）

### 完了済み

| バージョン | 憲法 | 状態 |
|-----------|------|------|
| v0.0 | 構造 + コード品質 + ツール | ✅ |
| v0.1 | データ基盤（初代151匹） | ✅ |
| v0.2 | UI実装 + デザインシステム | ✅ |
| v0.5 | 保守の憲法 | ✅ |
| v0.6 | 速度の憲法 | ✅ |
| v0.7 | 価値の憲法 | ✅ |

### 進行中

- デザインシステムの完全 Tier 3 化（全13コンポーネント）
- NgDoc ドキュメントの自動同期展開（#150）
- **NERV開発計画（AI自律駆動）** ← 今ここ 🔺

### 未着手 / 弱い領域

- v0.3 ロジックの憲法（テスト先行開発の強制）
- v0.4 UXの憲法（実質的な UX レビュー機能）
- テストカバレッジの向上（現在 skipped 多数）
- 全世代（Gen 1〜9）のデータ拡張

---

## 7. NERV計画との位置づけ

```
plan.md（原典）
  → 「各バージョンで憲法を追加」= 段階的品質向上
  → guards/ で機械的に実現済み

NERV開発計画（進化）
  → 憲法を「人間が手動で守る」から「AIが自律的に守る」へ
  → guards/ をMAGIデータソースとして活用
  → 人間（ゲンドウ）は「問題ない」と言うのが仕事

ビジョンメモ: tmp/dream-ai-driven-design-system.md
```

> **plan.md の「憲法」はNERVの基盤。NERVはその憲法を自律的に運用する仕組み。**
