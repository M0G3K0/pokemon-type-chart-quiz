// ポケモンタイプカラーにdescriptionを追加するスクリプト
const fs = require('fs');

const colorsPath = './design-tokens/tier1-primitive/colors.json';
const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));

// タイプ名の日本語マッピング
const typeNames = {
	normal: 'ノーマル',
	fire: 'ほのお',
	water: 'みず',
	electric: 'でんき',
	grass: 'くさ',
	ice: 'こおり',
	fighting: 'かくとう',
	poison: 'どく',
	ground: 'じめん',
	flying: 'ひこう',
	psychic: 'エスパー',
	bug: 'むし',
	rock: 'いわ',
	ghost: 'ゴースト',
	dragon: 'ドラゴン',
	dark: 'あく',
	steel: 'はがね',
	fairy: 'フェアリー'
};

// スケールごとのdescriptionテンプレート
const scaleDescriptions = {
	'50': (type, jp) => `物理的な${jp}タイプの最明色。背景用。ほぼ白に近い。`,
	'100': (type, jp) => `物理的な${jp}タイプの極明色。薄い背景用。`,
	'200': (type, jp) => `物理的な${jp}タイプの明色。アクセント背景用。`,
	'300': (type, jp) => `物理的な${jp}タイプの中明色。視認性あり。`,
	'400': (type, jp) => `物理的な${jp}タイプの鮮色。アクセントに適する。`,
	'500': (type, jp) => `物理的な${jp}タイプの基準色。バッジやアイコン用。`,
	'600': (type, jp) => `物理的な${jp}タイプのやや暗色。高コントラスト確保可能。`,
	'700': (type, jp) => `物理的な${jp}タイプの暗色。テキスト用。白背景上で高コントラスト。`,
	'800': (type, jp) => `物理的な${jp}タイプの極暗色。`,
	'900': (type, jp) => `物理的な${jp}タイプのほぼ黒。`,
	'950': (type, jp) => `物理的な${jp}タイプの最暗色。`
};

// ポケモンカラーにdescriptionを追加
colors.color.pokemon.$description = 'Pokemon type colors with full 11-step scale. Physical color values only.';

for (const [type, jpName] of Object.entries(typeNames)) {
	if (colors.color.pokemon[type]) {
		// タイプ全体のdescription
		colors.color.pokemon[type].$description = `${jpName}タイプのカラースケール。公式ゲームカラーベース。`;

		// 各スケールにdescriptionを追加
		for (const [scale, descFn] of Object.entries(scaleDescriptions)) {
			if (colors.color.pokemon[type][scale]) {
				colors.color.pokemon[type][scale].$description = descFn(type, jpName);
			}
		}
	}
}

// white/blackにもdescription追加
colors.color.white.$description = '物理的な純白。#FFFFFF。最大輝度。';
colors.color.black.$description = '物理的な純黒。#000000。最小輝度。';

fs.writeFileSync(colorsPath, JSON.stringify(colors, null, '\t'));
console.log('✅ ポケモンタイプカラーにdescriptionを追加しました');
