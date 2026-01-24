import { PokemonListSchema } from '../src/app/domain/pokemon.schema';
import * as fs from 'fs';
import * as path from 'path';

function validate() {
	const dataPath = path.join(__dirname, '../public/pokemons.json');
	const rawData = fs.readFileSync(dataPath, 'utf-8');
	const jsonData = JSON.parse(rawData);

	console.log('Validating pokemons.json...');
	const result = PokemonListSchema.safeParse(jsonData);

	if (!result.success) {
		console.error('Validation failed!', result.error);
		process.exit(1);
	}

	console.log('Validation successful!');
}

validate();
