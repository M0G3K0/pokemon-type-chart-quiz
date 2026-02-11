const fs = require('fs');
const path = require('path');

const types = [
	'normal', 'fire', 'water', 'electric', 'grass', 'ice',
	'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
	'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

async function downloadIcons() {
	const iconDir = path.join(__dirname, '../../public/icons');
	if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

	for (const type of types) {
		const url = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${type}.svg`;
		try {
			const res = await fetch(url);
			const svg = await res.text();
			fs.writeFileSync(path.join(iconDir, `${type}.svg`), svg);
			console.log(`Downloaded ${type}.svg`);
		} catch (e) {
			console.error(`Failed to download ${type}:`, e.message);
		}
	}
}

downloadIcons();
