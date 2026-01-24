const fs = require('fs');
const path = require('path');

async function fetchPokemons() {
	const pokemons = [];
	const limit = 151;

	console.log(`Fetching ${limit} pokemons...`);

	for (let i = 1; i <= limit; i++) {
		const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
		const data = await res.json();

		pokemons.push({
			id: data.id,
			name: data.name,
			types: data.types.map((t) => t.type.name),
			imageUrl: data.sprites.front_default,
		});

		if (i % 50 === 0) console.log(`Fetched ${i} pokemons...`);
	}

	const outputPath = path.join(__dirname, '../public/pokemons.json');
	fs.writeFileSync(outputPath, JSON.stringify(pokemons, null, 2));
	console.log(`Saved to ${outputPath}`);
}

fetchPokemons().catch(console.error);
