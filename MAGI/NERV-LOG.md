# NERV 研究ログ 🔺

> このファイルは NERV 開発の知見・意思決定・技術検証結果を蓄積する。
> 会話セッションを跨いでも参照できるよう、検証結果は必ずここに記録する。

---

## Phase 0: MAGI構築 ✅ (2026-02-08)

- MELCHIOR.md（設計知識）, BALTHASAR.md（コーディング規約）, CASPAR.md（プロセス）を作成
- guards/, design-tokens/, .agent/workflows/ との関係をREADME.mdに整理

## Phase 1: 出撃シーケンス（Level 1） ✅ (2026-02-08)

### やったこと
- `/component` ワークフローに Step 0: MAGI照会 を追加
- Step 7 を「出撃シーケンス」に改修（リツコ/ミサト/アスカ/冬月）
- `/screen` ワークフローも同様に更新

### テスト結果
- pt-text の buildTextClasses を純粋関数に切り出し → 18テスト全パス
- 出撃シーケンス（lint:css → lint → test → build → guards）全パス確認
- Level 1（1AIが帽子を切り替え）は問題なく動作

### 学び
- Angular コンポーネントは `new Component()` できない（DI依存）
- pure logic を `.logic.ts` に分離すればテスト可能
- **このパターンは他コンポーネントにも適用すべき**

---

## Phase 2: マルチエージェント検証 🔄 (2026-02-08〜)

### 方式比較

| 方式 | 概要 | Level |
|------|------|-------|
| **A: WSL + tmux** | shogun方式。完全独立プロセス。双方向通信可能。 | Level 3 |
| **B: Claude Code ネイティブ** | `.claude/agents/` でサブエージェント定義。メインが委任。 | Level 2 |

### 意思決定
- **B → A の段階的アプローチを採用**
- B で Level 2 を試す → キャラ設定・ツール権限の知見を貯める → A で Level 3 へ
- A と B は排他ではなく段階的

### 方針転換: Claude Code → Gemini CLI (2026-02-08)
- Claude Code は **Claude Pro/Max 契約が必要**（未契約）
- Antigravity（Google）に課金済み → **Gemini CLI なら追加コストゼロ**
- Gemini CLI にも `.gemini/agents/*.md` でサブエージェント定義可能（実験的機能）
- **Claude Code をアンインストール → Gemini CLI に一本化**

### 技術検証: Gemini CLI on Windows ✅
- `gemini --version` → v0.27.3
- Google ログイン認証 → **成功**
- サブエージェント（組み込み `codebase_investigator`）→ **動作確認済み**
- pt-text のデザイントークン分析を実行 → Tier 3 トークンの使用状況を正確に把握
- Windows ネイティブ対応（WSL不要）

### サブエージェント配置

```
.gemini/agents/          ← Gemini CLI 用（実際に使用）
├── ritsuko.md           # 設計レビュー（read_file, grep_search, find_by_name）
├── misato.md            # コード品質（+ run_command）
└── asuka.md             # テスト実行（+ run_command）

.claude/agents/          ← 削除済み（Claude Code 未契約のため）
```

### 残課題
- [ ] カスタムサブエージェント（ritsuko等）が自動で呼ばれるか検証
- [ ] settings.json の `experimentalFeatures.subAgents` が有効か確認
- [ ] frontmatter のツール名がGemini CLI仕様に合っているか調整
- [ ] 実タスクで ritsuko/misato/asuka を明示的に呼び出してテスト

---

## ブランチ戦略（一時的）

```
main: 通常の開発。NERV関連はマージしない。
beta/nerv-phase1: NERV 実験ブランチ。

マージ条件:
  Level 2 の技術的フィージビリティ確認後。
  価値ありなら MAGI/ とワークフロー変更のみ cherry-pick でマージ。
  価値なしならブランチごと破棄。
```

---

## 参照リンク
- [shogun 記事](https://zenn.dev/shio_shoppaize/articles/5fee11d03a11a1)
- [Claude Code サブエージェント公式](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Gemini CLI サブエージェント](https://geminicli.com) ← 新規追加
- ビジョンメモ: `tmp/dream-ai-driven-design-system.md`（git管理外）

