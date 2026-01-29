<!-- 🛡️ GUARDRAIL -->

# パフォーマンス基準（速度の憲法）

## @what / @why / @failure

```
@what  アプリケーションの実行速度（パフォーマンススコア）を検査
@why   「パフォーマンスは機能の一部」であり、ユーザー体験を損なわないため
@failure  Lighthouseスコアが基準を下回るとCIが失敗する
```

---

## ルール一覧

### 1. Lighthouse Performance Score

**基準**: 80点以上（モバイル）

**測定項目**:
- **FCP (First Contentful Paint)**: コンテンツが表示され始める時間
- **LCP (Largest Contentful Paint)**: メインコンテンツが表示される時間
- **CLS (Cumulative Layout Shift)**: レイアウトのズレ
- **TBT (Total Blocking Time)**: 操作不能な時間

**理由**: Core Web Vitalsに準拠し、ユーザーにストレスを与えないため。

### 2. Angular Bundles Budget

`angular.json` で定義されたバンドルサイズ制限。

#### メインアプリ（pokemon-type-chart-quiz）

- **Initial JS**: 500KB (warning) / 750KB (error)
- **Component Style**: 50KB (warning) / 100KB (error)

**現状の課題**: `styles.css` が1MBを超えており、Issue #34 でのリファクタリングが必要。

#### NgDoc（docs）

ドキュメントサイトはmermaid等の重いライブラリを含むため、メインアプリより緩い基準を適用。

- **Initial JS**: 2MB (warning) / 5MB (error)
- **Component Style**: 4KB (warning) / 8KB (error)

**理由**: NgDocはユーザー向けプロダクションアプリではなく、開発者向けドキュメントサイトのため、パフォーマンス基準を緩和。

---

## 実装

### ルールファイル（設定）

**ソースオブトゥルース**: [`performance.rules.js`](../rules/performance.rules.js)

### 使用方法

```bash
npm run lint:perf
```

（ローカルサーバを起動し、Lighthouse CIを実行する）

---

## 違反時の対応

1. レポートを確認する（`.lighthouseci/` に生成される）
2. JavaScriptの削減（遅延ロード、不要ライブラリ削除）
3. 画像の最適化
4. CLSの原因となっている要素（画像サイズ指定なし等）の修正

---

## 関連

- [Guards README](../../README.md)
