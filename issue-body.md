## 💡 概要

AI向けの指示を「Skills」「AGENTS.md」「Workflows」の3つに整理し、それぞれの役割と使い分けを明確化する。

### 現状の課題
- どこに何を書くべきか不明確
- 重複した情報が複数箇所に存在
- 強制力のレベルが統一されていない

### 3つの仕組みの違い

| 仕組み | 強制力 | 用途 | 例 |
|--------|--------|------|-----|
| **AGENTS.md** | 低（任意参照） | AI全体の性格・禁止事項 | PowerShell禁止、文字化け防止 |
| **Skills** | 低（AI判断） | 複雑タスクの手順書 | コードレビュー、デプロイ手順 |
| **Workflows** | 高（人間が呼び出し） | 定型作業の強制手順 | Issue作成、PR作成 |

## ✅ やることリスト

### 設計
- [ ] AGENTS.md / Skills / Workflows の責務を明文化
- [ ] 既存の内容を整理・再配置

### Workflows実装
- [ ] `.agent/workflows/create-issue.md` を作成
- [ ] `.agent/workflows/create-pr.md` を作成
- [ ] `/create-issue` 等のスラッシュコマンドで呼び出し可能にする

### Skills整理
- [ ] issue-creator Skill を Workflow に移行（または削除）
- [ ] 残すべきSkillがあれば整理

### AGENTS.md整理
- [ ] 重複を削除
- [ ] 「AIの性格」に関する内容のみに限定

### ドキュメント
- [ ] CONTRIBUTING.md に3つの仕組みの説明を追加

## 📝 詳細

### 理想的な責務分担

**AGENTS.md（AIの性格）**
```markdown
- PowerShellでのファイル編集禁止
- 日本語で回答
- 参照すべきドキュメント一覧
```

**Skills（複雑タスクの知識）**
```markdown
- コードレビューの観点
- デザインシステムの構造
- テスト戦略
```

**Workflows（定型作業の手順）**
```markdown
- Issue作成の手順
- PR作成の手順
- デプロイ手順
```

## 🔗 関連

- #11 Issueテンプレート統合
- #19 ローカル検証追加
