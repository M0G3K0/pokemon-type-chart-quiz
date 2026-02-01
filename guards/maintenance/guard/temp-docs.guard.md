<!-- 🛡️ GUARDRAIL -->

# 一時ドキュメント管理ルール

## @what / @why / @failure

```
@what  一時的な計画書・設計ドキュメントの配置と管理を強制
@why   ドキュメントの散乱を防ぎ、AIが正しい場所に計画書を作成できるようにするため
@failure  npm run lint:docs でエラーとなり、CIが失敗する
```

---

## 背景

開発中に作成される一時的なドキュメント（計画書、スペック、設計メモ）が散乱しやすい。
このガードレールにより：

1. **AIが計画書を正しい場所に保存**できる
2. **完了したタスクの計画書が自動的にアーカイブ対象**として検出される
3. **人間もAIも「古いドキュメントはここ」と分かる**

---

## ディレクトリ構造

```
docs/
├── temp/                      # 🔥 進行中タスクの計画書（一時置き場）
│   └── [task-name].md         # 各タスクの計画書
├── archive/                   # 📦 完了したドキュメント
│   └── YYYY-MM/               # 月別アーカイブ
└── README.md                  # 正式ドキュメント
```

---

## ルール一覧

### 1. ルート直下の許可ファイル

ルート直下に配置できる `.md` ファイルは以下のみ：

| ファイル | 用途 |
|---------|------|
| `README.md` | プロジェクト説明 |
| `AGENTS.md` | AIエージェント設定 |
| `CONTRIBUTING.md` | 貢献ガイド |
| `plan.md` | プロジェクト計画書 |

**違反例**: ルート直下に `token-strategy.md` などの一時ドキュメントを配置

### 2. 計画書の配置場所

タスク遂行中に作成する計画書・スペックは **`docs/temp/`** に配置する。

```markdown
---
task: "Quiz画面リファクタリング"
issue: "#123"
status: "in-progress"
created: "2026-02-01"
---

# Quiz画面リファクタリング計画

## 概要
...
```

**frontmatter 必須項目:**

| フィールド | 必須 | 説明 |
|-----------|------|------|
| `task` | ✅ | タスク名 |
| `issue` | ⬜ | 関連Issue番号 |
| `status` | ✅ | `in-progress` または `done` |
| `created` | ✅ | 作成日（YYYY-MM-DD） |

### 3. 完了したドキュメントのアーカイブ

タスク完了後、計画書は以下のいずれかの対応が必要：

1. **ガードレール化が必要** → `guards/` 配下にガードレールを作成してからアーカイブ
2. **ガードレール化不要** → そのままアーカイブ

**アーカイブ方法:**
```bash
# 月別フォルダにアーカイブ
mv docs/temp/task-name.md docs/archive/$(date +%Y-%m)/
```

### 4. status: done の放置禁止

`docs/temp/` 内で `status: done` のファイルは **アーカイブ待ち** 状態。
7日以上放置されている場合、静的解析で警告。

---

## 実装

### ルールファイル

**ソースオブトゥルース**: [`temp-docs.rules.js`](../rules/temp-docs.rules.js)

### 使用方法

```bash
npm run lint:docs
```

### package.json への追加

```json
{
  "scripts": {
    "lint:docs": "node scripts/lint-docs.js"
  }
}
```

---

## 違反時の対応

### エラー: ルート直下に不正なファイル

```
❌ ERROR: 不正な場所にドキュメントが存在します
   ファイル: /token-strategy.md
   
   📌 対処法:
   - 進行中のタスクの計画書なら → docs/temp/ に移動
   - 完了したドキュメントなら → docs/archive/YYYY-MM/ に移動
```

### 警告: status: done のまま放置

```
⚠️ WARNING: アーカイブ待ちのドキュメントがあります
   ファイル: docs/temp/quiz-refactor.md
   status: done, 作成日: 2026-01-25 (7日前)
   
   📌 対処法:
   - ガードレール化必要 → guards/ にルール作成後、アーカイブ
   - ガードレール化不要 → docs/archive/2026-02/ に移動
```

---

## AIエージェント向けガイドライン

### タスク開始時

1. 計画書が必要な場合、`docs/temp/[task-name].md` を作成
2. frontmatter に `task`, `status: in-progress`, `created` を記載
3. 関連Issueがあれば `issue` フィールドも追加

### タスク完了時

1. 計画書の `status` を `done` に更新
2. ガードレール化が必要か判断
3. 適切にアーカイブ

### エラーが出た場合

```
❌ ERROR: 不正な場所にドキュメントが存在します
   ファイル: /my-plan.md
```

**AIの対処:**
1. このファイルが現在のタスクに関連するか確認
2. 関連する → `docs/temp/` に移動し、frontmatter を追加
3. 関連しない → `docs/archive/YYYY-MM/` にアーカイブ

---

## 関連

- [Guards README](../../README.md)
- [Cleanliness Guard](cleanliness.guard.md) - デッドコード禁止
