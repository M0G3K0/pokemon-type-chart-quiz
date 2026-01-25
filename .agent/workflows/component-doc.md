---
description: コンポーネントドキュメントのたたきを作成する（NgDoc導入までの暫定対応）
---

# コンポーネントドキュメント作成ワークフロー

> **注意**: このワークフローはNgDocを導入するまでの暫定対応です。
> 
> **NgDoc導入後の構成**:
> - **配置場所**: `/docs` ディレクトリに NgDoc (Angular) を配置
> - **ホスティング**: GitHub Pages（メインアプリのVercelと完全分離）
> - **SSOT原則**: JSON内の `$description` から NgDoc へ動的インジェクション（説明文の二重管理を防止）

## 概要

`docs/components/` ディレクトリに、業界標準のデザインシステム（GitHub Primer、Material Design 3など）をベンチマークとしたコンポーネントドキュメントを作成します。

## 手順

### 1. ベンチマーク調査

以下のデザインシステムで対象コンポーネントの仕様を調査します：

- [GitHub Primer](https://primer.style/components)
- [Material Design 3](https://m3.material.io/components)
- [SmartHR Design System](https://smarthr.design/products/components/)
- [Adobe Spectrum](https://spectrum.adobe.com/page/components/)

調査ポイント：
- Props/APIの命名規則
- サイズバリエーション
- アクセシビリティ要件
- ユースケースとアンチパターン

### 2. ドキュメントファイル作成

`docs/components/pt-{component-name}.md` を以下のテンプレートで作成します：

```markdown
# pt-{component-name}

> {コンポーネントの1行説明}

**ベンチマーク**: [GitHub Primer {Component}]({url}) | [Material Design 3 {Component}]({url})

---

## Overview

{コンポーネントの詳細な説明}

---

## When to use ✅

| シチュエーション | 説明 |
|------------------|------|
| **{ユースケース1}** | {説明} |
| **{ユースケース2}** | {説明} |

---

## When not to use ❌ (Anti-patterns)

| アンチパターン | 理由 | 代替案 |
|----------------|------|--------|
| **{アンチパターン1}** | {理由} | {代替案} |

---

## Specs

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `{prop}` | `{type}` | `{default}` | {説明} |

### Size Tokens (該当する場合)

| Size | Dimensions | 用途 |
|------|------------|------|
| `sm` | {寸法} | {用途} |
| `md` | {寸法} | {用途} |
| `lg` | {寸法} | {用途} |

---

## Accessibility

- {アクセシビリティ要件1}
- {アクセシビリティ要件2}

---

## Examples

### Basic Usage

```html
<pt-{component-name}></pt-{component-name}>
```

### {その他のユースケース}

```html
{コード例}
```

---

## Design Patterns

### {パターン名}

{パターンの説明とコード例}

---

## Related Components

- `pt-{related}`: {関連の説明}

---

## References

- [{参考文献1}]({url})
- [{参考文献2}]({url})
```

### 3. Design Tokenとの整合性確認

- `design-tokens/tier3-component/` に対応するトークンファイルがあるか確認
- ドキュメント内のサイズやカラーがTokenと一致しているか確認
- 不整合があればTokenファイルを更新、またはドキュメントを修正

### 4. セルフレビューチェックリスト

- [ ] ベンチマーク先のURLが有効か
- [ ] Props一覧が実装と一致しているか
- [ ] When to use / When not to use が具体的か
- [ ] アクセシビリティ要件が記載されているか
- [ ] Examples のコードが実際に動作するか
- [ ] Design Tokensとの整合性がとれているか

---

## 参考例

- [pt-spinner.md](../../docs/components/pt-spinner.md) - Tier 1 Primitive コンポーネントの例
