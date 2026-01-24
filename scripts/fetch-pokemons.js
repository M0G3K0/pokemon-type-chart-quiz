const fs = require('fs');
const path = require('path');

async function fetchPokemons() {
	const pokemons = [];
	const limit = 151;

	console.log(`Fetching ${limit} pokemons with Japanese translations...`);

	for (let i = 1; i <= limit; i++) {
		// Fetch basic data (for sprites and types)
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
		const data = await res.json();

		// Fetch species data (for Japanese name)
		const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
		const speciesData = await speciesRes.json();

		const jaName = speciesData.names.find((n) => n.language.name === 'ja-Hrkt')?.name || data.name;

		// Fetch type translations
		const translatedTypes = await Promise.all(
			data.types.map(async (t) => {
				const typeRes = await fetch(t.type.url);
				const typeData = await typeRes.json();
				return {
					en: t.type.name,
					ja: typeData.names.find((n) => n.language.name === 'ja-Hrkt')?.name || t.type.name,
				};
			})
		);

		pokemons.push({
			id: data.id,
			name: jaName,
			enName: data.name,
			types: translatedTypes.map((t) => t.en),
			jaTypes: translatedTypes.map((t) => t.ja),
			imageUrl: data.sprites.front_default,
		});

		if (i % 10 === 0) console.log(`Fetched ${i} pokemons...`);
	}

	const outputPath = path.join(__dirname, '../public/pokemons.json');
	fs.writeFileSync(outputPath, JSON.stringify(pokemons, null, 2));
	console.log(`Saved to ${outputPath}`);
}

fetchPokemons().catch(console.error);
