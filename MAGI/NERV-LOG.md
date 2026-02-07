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

### 技術検証: Claude Code on Windows
- `npx @anthropic-ai/claude-code --version` → v2.1.34 確認済み
- `claude` コマンドは PATH に未登録（グローバルインストールはされている）
- WSL2 は未インストール（方式A の場合は必要）
- **方式B は `.claude/agents/` にファイル置くだけなので環境構築不要**

### サブエージェント設計案

```
.claude/agents/
├── ritsuko.md    # 設計レビュー（Read, Grep, Glob のみ）
├── misato.md     # コード品質チェック（Read, Grep, Glob, Bash）
├── asuka.md      # テスト実行（Read, Bash）
└── shinji.md     # 実装（全ツール） ※メイン会話で代替可能
```

### TODO
- [ ] Claude Code を PATH に通す or グローバルインストール
- [ ] `.claude/agents/` にリツコ・ミサト・アスカを定義
- [ ] 実タスクで方式B を検証
- [ ] 検証結果をこのログに追記

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
- ビジョンメモ: `tmp/dream-ai-driven-design-system.md`（git管理外）
