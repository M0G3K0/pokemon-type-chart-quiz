# ポケモンデータ仕様書

> このドキュメントは `public/pokemons.json` のデータ構造と設計方針を定義します。

## 設計方針

### データ構造: フラット構造

メガシンカ・リージョンフォームも含め、全エントリーを同じ配列に並べる。

```json
[
  { "id": 6, "name": "リザードン", "formId": null, ... },
  { "id": 6, "name": "メガリザードンX", "formId": "mega-x", ... },
  { "id": 52, "name": "アローラニャース", "formId": "alola", ... }
]
```

**選定理由:**
- クイズアプリでのランダム出題が1行で書ける
- フィルタリング（世代、ゲーム別等）がシンプル
- ネスト構造より展開処理が不要

### ファイル構成: 単一ファイル

全データを `pokemons.json` 1ファイルに格納する。

**選定理由:**
- HTTPリクエスト1回で済む（最速）
- 全ポケモン（~1200エントリー）でも gzip 圧縮後 ~120KB
- 複数ファイル管理の複雑さを回避

---

## データスキーマ

### 必須フィールド

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `id` | number | 図鑑番号（フォルムでも原種と同じ番号） |
| `name` | string | 日本語名 |
| `enName` | string | 英語名 |
| `types` | string[] | 英語タイプ名（相性計算用） |
| `jaTypes` | string[] | 日本語タイプ名（表示用） |
| `imageUrl` | string | スプライト画像URL（ドット静止画） |
| `generation` | number | 世代番号 (1-9) |

### フォルム関連

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `formId` | string \| null | フォルム識別子（原種は null） |
| `formType` | string \| null | フォルム種別: `"mega"`, `"alola"`, `"galar"`, `"hisui"`, `"paldea"` など |
| `formNameJa` | string \| null | フォルム名（日本語） |

### 特性

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `abilities` | string[] | 通常特性（日本語名） |
| `hiddenAbility` | string \| null | 夢特性（日本語名、なければ null） |

### 図鑑・ゲーム情報

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `pokedexes` | string[] | 内定した図鑑リスト |

### メディア

| フィールド | 型 | 説明 |
|-----------|-----|------|
| `cry` | string \| null | 鳴き声URL（.ogg） |

---

## 図鑑コード一覧

出題範囲フィルターで使用する図鑑識別子:

| コード | ゲーム |
|--------|--------|
| `national` | 全国図鑑 |
| `kanto` | 赤緑青ピカ/FRLG/LPLE |
| `original-johto` | 金銀クリスタル |
| `hoenn` | RS |
| `updated-hoenn` | ORAS |
| `original-sinnoh` | DP |
| `extended-sinnoh` | Pt |
| `original-unova` | BW |
| `updated-unova` | BW2 |
| `kalos-central` | XY (セントラル) |
| `kalos-coastal` | XY (コースト) |
| `kalos-mountain` | XY (マウンテン) |
| `original-alola` | SM |
| `updated-alola` | USUM |
| `letsgo-kanto` | LPLE |
| `galar` | 剣盾 (本編) |
| `isle-of-armor` | 剣盾 (鎧の孤島) |
| `crown-tundra` | 剣盾 (冠の雪原) |
| `hisui` | レジェンズアルセウス |
| `paldea` | SV (本編) |
| `kitakami` | SV (碧の仮面) |
| `blueberry` | SV (藍の円盤) |
| `lumiose-city` | Z-A (予定) |

---

## フォルム種別

| formType | 説明 | 例 |
|----------|------|-----|
| `mega` | メガシンカ | メガリザードンX |
| `mega-y` | メガシンカ (Y) | メガリザードンY |
| `alola` | アローラのすがた | アローラニャース |
| `galar` | ガラルのすがた | ガラルニャース |
| `hisui` | ヒスイのすがた | ヒスイゾロアーク |
| `paldea` | パルデアのすがた | パルデアウパー |

**対象外:**
- キョダイマックス（タイプ変化なし）
- 姿違い（見た目だけ、タイプ変化なし）

---

## スプライト仕様

### 採用: ドット静止画

```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```

**選定理由:**
- クラシックなドット絵の雰囲気を維持
- 全世代・全フォルム対応
- 軽量

### 代替オプション（将来検討）

| 種類 | URL例 | 特徴 |
|------|-------|------|
| アニメGIF (BW) | `.../generation-v/black-white/animated/{id}.gif` | ドットアニメ、第1-5世代のみ |
| Showdown | `.../other/showdown/{id}.gif` | 3D風アニメ、全世代対応 |

---

## データ取得スクリプト

`scripts/fetch-pokemons.js` の機能:

- **並列バッチ処理**: 10匹同時取得、Rate Limiting対策
- **リトライ機構**: 失敗時は指数バックオフで再試行
- **進捗保存**: 中断しても続きから再開可能
- **バリデーション**: 日本語データ必須、英語フォールバック禁止
- **タイプ翻訳キャッシュ**: 18タイプは事前定義（APIコール削減）

### 実行方法

```bash
node scripts/fetch-pokemons.js
```

### 設定変更

`CONFIG` オブジェクトで調整可能:
- `limit`: 取得するポケモン数
- `batchSize`: 並列処理数
- `includeFormTypes`: 取得するフォルム種別

---

## 使用例

```typescript
// ランダム出題
const pokemon = pokemons[Math.floor(Math.random() * pokemons.length)];

// 第1世代のみ
const gen1 = pokemons.filter(p => p.generation === 1);

// メガシンカを除外
const noMega = pokemons.filter(p => p.formType !== 'mega');

// SVで使えるポケモン
const svPokemon = pokemons.filter(p => p.pokedexes.includes('paldea'));

// ふゆう持ち（じめん技無効）
const levitators = pokemons.filter(p => 
  p.abilities.includes('ふゆう') || p.hiddenAbility === 'ふゆう'
);
```
