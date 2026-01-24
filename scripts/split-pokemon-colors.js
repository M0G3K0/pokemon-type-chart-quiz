// ポケモンタイプカラーを別ファイルに分割するスクリプト
const fs = require('fs');

const colorsPath = './design-tokens/tier1-primitive/colors.json';
const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));

// ポケモンカラーを抽出
const pokemonColors = {
	"$description": "Tier 1: Primitive Pokemon Type Color Tokens - Raw color values for 18 types.",
	"color": {
		"pokemon": colors.color.pokemon
	}
};

// 元ファイルからポケモンカラーを削除
delete colors.color.pokemon;

// ファイル書き出し
fs.writeFileSync(colorsPath, JSON.stringify(colors, null, '\t'));
fs.writeFileSync('./design-tokens/tier1-primitive/colors-pokemon.json', JSON.stringify(pokemonColors, null, '\t'));

console.log('✅ ポケモンカラーを colors-pokemon.json に分割しました');
console.log(`   colors.json: ${Object.keys(colors.color).length} colors`);
console.log(`   colors-pokemon.json: ${Object.keys(pokemonColors.color.pokemon).length - 1} types`); // -1 for $description
