# Design Token Strategy & Component Quality Audit

Issue #56, #107, #108 の調査・方針決定ドキュメント

---

## 1. デザインシステム調査結果

### 1.1 Material Design 3

**トークン階層:**
| レベル | 名称 | 説明 |
|--------|------|------|
| Reference | 参照トークン | 全ての利用可能な値（生の色、サイズ等） |
| System | システムトークン | デザインシステムの性格を定義（color, typography, elevation等） |
| Component | コンポーネントトークン | 個々のコンポーネント要素に割り当てられたプロパティ |

**Elevation:**
- 6レベル（0, +1, +2, +3, +4, +5）
- Resting states: Level 0-3
- User-interacted states: Level 4-5
- Shadow + Tonal surface colorで表現

**Surface/Card/Paper:**
- **Surface**: elevation + tonal variance で視覚的関係を定義
- **Card**: Elevated / Filled / Outlined の3種類
- **Paper (MUI)**: elevation 0-24、コンテナとして機能

---

### 1.2 GitHub Primer

**トークン階層:**
| レベル | 名称 | 説明 |
|--------|------|------|
| Base (Primitives) | ベーストークン | 生の値（hex color, font-size等） |
| Functional | 機能トークン | セマンティックな意味を持つ（bgColor-inset等） |
| Component/Pattern | コンポーネントトークン | 個々のコンポーネント用（button-primary-bgColor-hover等） |

**コンポーネント:**
- **Box**: padding, margin, background, border用の汎用レイアウトツール
- **Card**: コンパクトな情報表示、グループで使用
- **Surface**: 明示的なコンポーネントは存在しない（Boxで代替）

---

### 1.3 SmartHR Design System

**トークン階層:**
| レベル | 名称 | 説明 |
|--------|------|------|
| Base/Primitive | ベーストークン | 基礎値 |
| Semantic | セマンティックトークン | 目的を記述（primary-background等） |
| Component | コンポーネントトークン | 個々のコンポーネント用 |

**レイアウト:**
- **Base**: 基礎的なレイアウト領域/コンテナ
- 単一コンテンツ時はBase不要（背景色WHITE、パディング除去）

---

### 1.4 Atlassian Design System

**トークン階層:**
| レベル | 名称 | 説明 |
|--------|------|------|
| Primitive | プリミティブ | 生の値 |
| Alias | エイリアス | システムレベルの決定 |
| Component | コンポーネント | 個々のコンポーネント用 |

**Elevation:**
- 4レベル: **Sunken** (最低) → **Default** → **Raised** → **Overlay** (最高)
- `elevation.surface.sunken`, `elevation.surface.raised` 等の命名
- Shadow + Surface colorの組み合わせ

**重要な知見:**
> 「Sunken」は Kanban board のカラムなど、コンテンツのバックドロップに使用
> 「elevation.surface.sunken」と「color.background.neutral」は異なる用途

---

## 2. 現プロジェクトのトークン監査

### 2.1 トークン階層の現状

| Tier | 名称 | ファイル数 |
|------|------|-----------|
| Tier 1 | Primitive | 5ファイル |
| Tier 2 | Semantic | 4ファイル |
| Tier 3 | Component | 9ファイル |

### 2.2 コンポーネントとTier3トークンの対応

| コンポーネント | Tier3トークン | 状態 |
|---------------|--------------|------|
| pt-avatar | ✅ avatar.json | OK |
| pt-button | ✅ button.json | OK |
| pt-card | ✅ card.json | OK |
| pt-chip | ❌ なし | **Phase 2で作成** |
| pt-grid | ✅ grid.json | OK |
| pt-heading | ✅ heading.json | OK |
| pt-icon | ❌ なし | **Phase 2で作成** |
| pt-radio-button | ✅ radio-button.json | OK |
| pt-spinner | ❌ なし | **Phase 2で作成** |
| pt-stack | ✅ stack.json | OK |
| pt-surface | ✅ surface.json | OK |
| pt-text | ❌ なし | **Phase 2で作成** |
| pt-type-chip | ❌ なし | **Phase 2で作成** |
| pt-badge | ✅ badge.json | OK |

### 2.3 トークン使用の問題点

#### pt-spinner
```scss
// 問題: Tier2の正しいトークンを使用していない
width: var(--spacing-4);  // ❌ 不明なトークン
```

#### pt-icon
```scss
// OK: Tier2 spaceトークンを使用
width: var(--pt-space-5);  // ✅ 正しい
```

#### pt-chip
```scss
// 問題: Tier3トークンがない
// chip.jsonが存在しないため、Tier2を直接参照
padding: var(--pt-space-1);  // セマンティック的に正しいか要検証
```

#### pt-text
```scss
// OK: Tier2 typographyを直接参照（意図的）
// Typography は Tier 2 composite token を直接使用
font-family: var(--pt-typography-body-lg-font-family);
```

---

## 3. 方針決定

### 3.1 Tier3トークン方針

> [!IMPORTANT]
> **方針: すべてのUIコンポーネントにTier3トークンを作成する**

**理由:**
1. **NgDocドキュメント自動生成**: StyleタブがTier3トークンを参照して自動生成されるため、一貫性が向上
2. **AI開発との親和性**: トークン構造が一貫していると、AIがドキュメント生成しやすい
3. **将来の拡張性**: 今は単純でも、将来バリアント追加時に対応しやすい
4. **変更の吸収**: Tier2変更時にTier3で吸収可能

> [!NOTE]
> 他の主要デザインシステム（Material Design、Primer、Atlassian）は「選択的アプローチ」を採用しているが、
> 本プロジェクトはNgDoc + AI自動生成ワークフローがあるため、一貫性を優先する。

| コンポーネント | Tier3 | 方針 |
|---------------|-------|------|
| pt-icon | **作成する** | サイズトークンをTier3で定義（Tier2 spaceを参照） |
| pt-spinner | **作成する** | サイズ・色トークンをTier3で定義 |
| pt-text | **作成する** | TypographyトークンをTier3で定義（Tier2 typographyを参照） |
| pt-chip | **作成する** | padding, radius, color等をTier3で定義 |
| pt-type-chip | **作成する** | pt-chipを拡張したトークン定義 |

**パススルートークンの例:**
```json
// icon.json - Tier2を参照するだけでもOK
{
  "icon": {
    "size": {
      "sm": { "$value": "{pt.space.5}" },
      "md": { "$value": "{pt.space.8}" },
      "lg": { "$value": "{pt.space.12}" }
    }
  }
}
```

### 3.2 Surface/Card/Paper責務分離

> [!IMPORTANT]
> **方針: pt-paperは導入しない。pt-surfaceで代替可能**

**各デザインシステムの調査結果:**
- Material Design: Surface + Card（Paper はMUI固有）
- Primer: Box + Card（Surface/Paper なし）
- SmartHR: Base（Surface相当）+ 各種コンポーネント
- Atlassian: elevation.surface トークン（Box等で使用）

**現プロジェクトの構造:**
- `pt-surface`: 基本的なコンテナ（padding, radius, variant）
- `pt-card`: 構造化されたコンテナ（header, content, footer + elevation）

**責務分離:**
| コンポーネント | 責務 |
|---------------|------|
| pt-surface | 基礎レイアウト、背景、パディング、角丸 |
| pt-card | 構造化コンテンツ（header/footer付き）、elevation |

**Elevationについて:**
- pt-surface の `variant` で flat/raised/overlay を提供するのは適切
- pt-card の `elevation` も同様
- **pt-paper は不要** - pt-surface が同等の機能を提供

### 3.3 コンポーネント品質改善方針

| コンポーネント | 問題 | 改善方針 |
|---------------|------|----------|
| **Icon** | デモで非表示 | AssetPathService のパス解決を確認 |
| **Spinner** | 形状がイチョウ型、サイズ小 | CSS修正、正しいトークン参照に修正 |
| **RadioButton** | 選択時の色問題、余白大 | トークン値の調整 |
| **Button** | secondary/ghost不明確、押下時ずれ | バリアント定義見直し、CSS修正 |
| **Card** | padding狭い、角丸大きい | トークン値の調整 |
| **Avatar** | Shape違い不明瞭 | 視覚的差異の強化または削減 |
| **Heading** | Size/Levelの違い不明確 | ドキュメント明確化 |

---

## 4. 次のステップ

### Phase 2: トークン修正
1. 不足しているTier3トークンファイルを作成（icon, spinner, text, chip, type-chip）
2. pt-spinner の不正なトークン参照を修正
3. 各コンポーネントのトークン使用を監査・修正
4. コンポーネントSCSSをTier3トークン参照に更新

### Phase 3: コンポーネント修正
1. Icon/Spinner の表示問題修正
2. RadioButton の色・余白問題修正
3. Button のバリアント・インタラクション修正
4. Card のパディング・角丸調整
5. Avatar/Heading の改善

### Phase 4: ドキュメント更新
1. NgDoc Styleタブを更新（トークン不使用の理由を明記）
2. 設計決定をドキュメント化
