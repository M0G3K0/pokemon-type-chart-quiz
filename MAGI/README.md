# MAGI SYSTEM 🔺

> NERVのスーパーコンピュータ。AIが「照会」するプロジェクト知識ベース。

## これは何？

AIがコードを書く・レビューするとき、最初に読むべきファイル群。
散らばっている110+ファイルの知識を3ファイルに集約したもの。

## 各システムの役割

| システム | ファイル | 担当エージェント | 問い |
|---------|---------|----------------|------|
| **MELCHIOR** | [MELCHIOR.md](./MELCHIOR.md) | 🔬 リツコ（Design Guard） | 「この設計は**論理的に正しい**か？」 |
| **BALTHASAR** | [BALTHASAR.md](./BALTHASAR.md) | 🎖️ ミサト + 🔥 アスカ | 「このコードは**育てやすい**か？」 |
| **CASPAR** | [CASPAR.md](./CASPAR.md) | 🔵 レイ（Process Guard） | 「このプロセスは**整っている**か？」 |

## 他のフォルダとの関係

```
プロジェクトルート
├── plan.md              ← 🗺️ 原典（プロジェクト設計図・憲法の定義）
├── MAGI/                ← 🧠 AIの脳（plan.md + guards/ + tokens/ を集約）
│   ├── README.md            このファイル
│   ├── MELCHIOR.md          デザイン + アーキテクチャ知識
│   ├── BALTHASAR.md         コーディング規約 + 全制約条件
│   └── CASPAR.md            プロセス + プロジェクト概要
├── guards/              ← 🛡️ 憲法の実装（.guard.md + .rules.js ペア）
│   ├── architecture/        構造の憲法
│   ├── code-quality/        コード品質の憲法
│   ├── design/              デザインの憲法
│   ├── maintenance/         保守の憲法
│   ├── process/             プロセスの憲法
│   └── ...                  速度/UX/価値/メタ
├── design-tokens/       ← 🎨 デザインSSoT（Tier 1/2/3 の JSON定義）
├── .agent/workflows/    ← 📋 作業手順書（/component, /pr, /issue 等）
└── tmp/                 ← 💭 構想メモ（コミットしない）
    └── dream-ai-driven-design-system.md  ← NERV開発計画ビジョン
```

### 情報の流れ

```
plan.md（Why — なぜこのルールがあるか）
    ↓ 具体化
guards/（What — 何をチェックするか）  +  design-tokens/（SSoT）
    ↓ 集約
MAGI/（AIが読む用に最適化された知識ベース）
    ↓ 参照
.agent/workflows/（AIが従う作業手順）
```

## 使い方

AIへの指示に以下を含める:
```
まず MAGI/ の各ファイルを読んでから作業を開始してください。
```
