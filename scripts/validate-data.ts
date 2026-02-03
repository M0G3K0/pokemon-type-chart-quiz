import { parsePokemonList } from '../src/app/domain/pokemon.schema';
import * as fs from 'fs';
import * as path from 'path';

function validate() {
	const dataPath = path.join(__dirname, '../public/pokemons.json');
	const rawData = fs.readFileSync(dataPath, 'utf-8');
	const jsonData = JSON.parse(rawData);

	console.log('Validating pokemons.json...');

	try {
		const pokemons = parsePokemonList(jsonData);
		console.log(`Validation successful! ${pokemons.length} Pokemon validated.`);
	} catch (error) {
		console.error('Validation failed!', error);
		process.exit(1);
	}
}

validate();
