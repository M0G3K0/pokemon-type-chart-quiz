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

### Level 2 検証結果 ✅ (2026-02-08)

#### ✅ 成功
- **リツコ**: 設計レビューサブエージェントが正常動作。Tier 3 トークン遵守を正確に検証
  - ペルソナ: 報告形式で `🔬 リツコ: MAGIに照会……` が出力され、`「パターン確認、問題ありません」` と報告
- **アスカ**: テスト担当サブエージェント。ペルソナは反映（「テスト結果を教えてくれれば、アスカが責任を持って報告してあげるから、早くしなさい！」）

#### ⚠️ 制約
- **非対話モード (`-p`) では `run_shell_command` が無効** — テスト実行にはインタラクティブモードが必要
- **ペルソナは最終報告時のみ** — 中間分析はGeminiデフォルト口調。system prompt 強化で改善余地

#### 🔧 ツール名のトラブルシューティング
- `GrepTool`, `GlobTool` → ❌ 無効（Claude Code 形式）
- `read_many_files` → ❌ 無効（サブエージェントでは利用不可）
- 正しいツール名（ソースコード `tool-names.ts` から確認）:

```
read_file, grep_search, glob, list_directory, run_shell_command,
write_file, replace, google_web_search, web_fetch, save_memory,
write_todos, activate_skill, ask_user
```

#### 設定
- `~/.gemini/settings.json` に `"experimental": { "enableAgents": true }` 必要
- プロジェクトレベル `.gemini/settings.json` にも同設定

### Phase 2 → Phase 3 への移行判定
- **Level 2 フィージビリティ: ✅ 確認完了**
- カスタムサブエージェントは動作する
- ペルソナ・ツール制限・報告形式すべて機能
- **Level 3 に進む条件は満たされた**

---

## Phase 3: Level 3 準備 🔄 (2026-02-08〜)

### アーキテクチャ
```
Level 3: WSL2 + tmux + Gemini CLI
  将軍（ユーザー） → YAML → 家老（メインエージェント）
  家老 → タスク分解 → 足軽×N（並列エージェント）
  足軽 = ritsuko / misato / asuka の独立プロセス
```

### TODO
- [ ] WSL2 インストール
- [ ] WSL 内に Node.js + Gemini CLI セットアップ
- [ ] tmux インストール・設定
- [ ] 将軍-家老-足軽 構造の実装
- [ ] 実タスクで全体動作検証

---

## ブランチ戦略（一時的）

```
main: 通常の開発。NERV関連はマージしない。
beta/nerv-phase1: NERV 実験ブランチ。

マージ条件:
  Level 2 の技術的フィージビリティ確認後。 ← ✅ 完了
  Level 3 の構築が安定したら MAGI/ とワークフロー変更のみ cherry-pick。
```

---

## 参照リンク
- [shogun 記事](https://zenn.dev/shio_shoppaize/articles/5fee11d03a11a1)
- [Claude Code サブエージェント公式](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Gemini CLI サブエージェント](https://geminicli.com)
- [Gemini CLI ソースコード tool-names.ts](https://github.com/google-gemini/gemini-cli/blob/main/packages/core/src/tools/tool-names.ts)
- ビジョンメモ: `tmp/dream-ai-driven-design-system.md`（git管理外）


