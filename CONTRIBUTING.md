# 開発者ガイド (CONTRIBUTING.md)

## ブランチ戦略

本プロジェクトでは、Gitフローを簡略化した以下の戦略を採用します：

1.  **`main` ブランチ**: 常時デプロイ可能な最新の安定ブランチ。直接のコミットは禁止（ガードレール設定等の初期設定を除く）。
2.  **フィーチャーブランチ (`feat/*`, `fix/*`, `chore/*`)**: 各機能開発、修正、雑用はこのブランチで行う。
3.  **プルリクエスト (PR)**: `main` への合流は必ず PR を通し、CIパスを確認した上で行う。

### ブランチ名の命名規則

- 新機能: `feat/feature-name`
- 修正: `fix/bug-name`
- 改善・リファクタリング: `refactor/change-name`
- 基盤設定・ドキュメント: `chore/task-name`

## コミットメッセージの規則

[Conventional Commits](https://www.conventionalcommits.org/) に準拠します。

例:
- `feat: ポケモン選択機能の追加`
- `fix: タイプ相性計算の誤りを修正`
- `chore: 保存用スクリプトの更新`

## 開発フロー

1.  Issue を作成（または担当）。
2.  ローカルでブランチを切る: `git checkout -b feat/my-new-feature`
3.  開発を行い、こまめにコミットする。
4.  リモートにプッシュ: `git push origin feat/my-new-feature`
5.  PR を作成: `gh pr create --body-file pr-body.md`
6.  CI（自動テスト・リント）がパスすることを確認。
7.  マージ！

---

## AIエージェント向けの仕組み

本プロジェクトでは、AIエージェントの開発支援のために3つの仕組みを提供しています：

| 仕組み | 強制力 | 用途 | 場所 |
|--------|--------|------|------|
| **AGENTS.md** | 低（任意参照） | AIの性格・禁止事項 | `/AGENTS.md` |
| **Skills** | 低（AI判断） | 複雑タスクの知識 | `/.agent/skills/` |
| **Workflows** | 高（人間が呼び出し） | 定型作業の強制手順 | `/.agent/workflows/` |

### AGENTS.md

AIエージェントがグローバルに参照する指示。禁止事項（PowerShellでのファイル編集など）や優先ツールを定義。

### Skills

複雑なタスクに関する知識をまとめたもの。AIが必要と判断した場合に参照する。

### Workflows

定型作業の手順書。スラッシュコマンド（`/create-issue`, `/create-pr`）で呼び出し可能。
**人間がAIに作業を依頼する際はWorkflowを指定することで、一貫した手順での作業を強制できる。**
