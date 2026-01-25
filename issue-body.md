> ⚠️ **タイトルは英語で書いてください** (`feat: xxx`, `fix: xxx`, `chore: xxx` 等)

## 💡 概要
タイプアイコンを最新のもの（Generation IX - Scarlet/Violet）に更新します。現在のアイコンは古いバージョンのものを使用しているため、PokeAPI公式スプライトから最新版を取得します。

## 📝 詳細
**現在の状況:**
- `scripts/download-icons.js` が GitHub の `duiker101/pokemon-type-svg-icons` から古いアイコンを取得している
- これは古いデザインで、最新世代（スカーレット・バイオレット）のアイコンではない

**解決策:**
- PokeAPI公式のタイプスプライトエンドポイントから最新アイコンを取得
- URL: `https://pokeapi.co/api/v2/type/{type-id}`
- 最新アイコンは `sprites.generation-ix.scarlet-violet.name_icon` から取得可能

**例（ほのおタイプ）:**
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/10.png
```

## ✅ やることリスト
- [ ] `scripts/download-icons.js` を更新して PokeAPI から最新アイコンを取得
- [ ] 全18タイプのアイコンをGeneration IX版に置き換え
- [ ] SVG形式が利用できない場合はPNGをSVGに変換、またはPNGのまま使用する方法を検討
- [ ] `public/icons/` のアイコンファイルを更新
- [ ] ローカルで表示確認

## 📷 参考資料（任意）
- PokeAPI Type エンドポイント: https://pokeapi.co/api/v2/type/
- PokeAPI スプライトリポジトリ: https://github.com/PokeAPI/sprites
