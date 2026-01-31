> ⚠️ **タイトルは英語で書いてください** (`feat: xxx`, `fix: xxx`, `chore: xxx` 等)

## 💡 概要

NgDocドキュメントで各UIコンポーネントを確認した結果、デザイン・実装・トークン使用に関する複数の問題点が発見された。他のデザインシステム（Material Design、GitHub Primer、SmartHR UI等）を参照し、現在の実装を見直して改善する。

## 📝 詳細

### 🔴 コンポーネント別の問題点

#### 1. Avatar
- **Shape違いがわかりにくい**: circle / rounded / square の視覚的な違いが不明瞭
- **背景色との関係**: shapeは背景色や用途と関連するべきか？必要性の再検討

#### 2. Button
- **secondary vs ghost の違いが不明確**: 使い分けの基準とビジュアルの差が曖昧
- **押下時のインタラクションで文字中心がずれる**: ボタン押下感の表現が文字配置に影響
- **一般的なデザインシステムとの比較**: 押下感の表現方法を調査

#### 3. Button vs Radio Button
- **UIが大きく異なる**: 同じ「選択」操作なのに見た目が完全に違う
- **一貫性の観点**: 許容されるべきか、統一すべきか検討

#### 4. Card
- **パディングが狭すぎる**: テキストに対してピッタリしすぎ（header/footer含む）
- **角丸が大きすぎる**: 他のデザインシステムとの比較が必要
- **elevation の責務**: paperコンポーネント的なもので担保すべきではないか？
- **Cardコンポーネントの必要性**: pt-surfaceとの責務の重複？

#### 5. Heading
- **SizeとLevelの違いが不明確**: セマンティクスと見た目の分離の説明不足
- **レスポンシブ対応**: スマホでもPCでも本当に適切なサイズか？

#### 6. Icon
- **⚠️ コンポーネントが表示されていない**: デモが動作していない（要調査）

#### 7. Radio Button
- **選択中の文字が読めない**: 文字色と背景色が同じになっている可能性
- **テキスト外側の余白が大きい**: 特に縦方向のパディングが過剰

#### 8. Spinner
- **サイズが小さすぎる**
- **形状がおかしい**: ドーナツ状ではなく、円の中心まで詰まっている（イチョウ型）

---

### 🟡 トークン設計の根本的な問題

#### Tier3 → Tier2 → Tier1の整合性
- **Primitiveトークンの定義とずれていないか？**
  - 例: `sm`サイズ用と定義されたトークンが、実際には別サイズに使われている等
- **Primitiveトークン定義自体の正確性**
  - 他のデザインシステムを参照し、トークン定義が適切か確認
  - 定義が曖昧・不正確な場合は修正

---

## ✅ やることリスト

### Phase 1: 調査・分析
- [ ] 他のデザインシステム（Material Design、Primer、SmartHR）のコンポーネント実装を調査
- [ ] 各コンポーネントの問題点を詳細に分析し、改善方針を決定
- [ ] Primitiveトークンの定義と実際の使用状況を照合

### Phase 2: トークン修正
- [ ] Primitiveトークン定義の見直し・修正
- [ ] Component (Tier3) トークンの修正

### Phase 3: コンポーネント修正

#### Avatar
- [ ] Shape違いの視覚的な明確化（または不要なshapeの削除）

#### Button
- [ ] secondary/ghost の違いを明確化（または統合）
- [ ] 押下時インタラクションの見直し（文字ずれ問題の解消）

#### Button / Radio Button
- [ ] UI一貫性の検討・改善

#### Card
- [ ] パディング調整（header/content/footer）
- [ ] 角丸サイズの見直し
- [ ] elevationの責務を再検討（paper化の検討）
- [ ] pt-surfaceとの責務分担を再定義

#### Heading
- [ ] Size/Levelの違いをドキュメント明確化
- [ ] レスポンシブ対応の検討

#### Icon
- [ ] 表示されない問題の修正

#### Radio Button
- [ ] 選択時の色問題を修正
- [ ] 余白の調整

#### Spinner
- [ ] サイズの見直し
- [ ] 形状の修正（ドーナツ状に）

### Phase 4: ドキュメント更新
- [ ] NgDocの各コンポーネントドキュメントを更新
- [ ] 変更理由・デザイン決定をドキュメント化

## 📷 参考資料（任意）

### 参照すべきデザインシステム
- [Material Design 3](https://m3.material.io/components)
- [GitHub Primer](https://primer.style/components)
- [SmartHR Design System](https://smarthr.design/products/components/)
- [Chakra UI](https://chakra-ui.com/docs/components)
- [Radix UI](https://www.radix-ui.com/primitives)

### 現在のトークン構造
- `design-tokens/tier1-primitive/` - Primitiveトークン
- `design-tokens/tier2-semantic/` - Semanticトークン
- `design-tokens/tier3-component/` - Componentトークン
