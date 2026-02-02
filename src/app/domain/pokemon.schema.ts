/**
 * Pokemon data model
 * @description Represents a Pokemon with its basic information
 */
export interface Pokemon {
	id: number;
	name: string;
	enName: string;
	types: string[];
	jaTypes: string[];
	imageUrl: string;
}

/**
 * Type guard to validate Pokemon data at runtime
 * @param data - Unknown data to validate
 * @returns True if data is a valid Pokemon
 */
function isPokemon(data: unknown): data is Pokemon {
	if (!data || typeof data !== 'object') return false;
	const pokemon = data as Record<string, unknown>;
	return (
		typeof pokemon['id'] === 'number' &&
		typeof pokemon['name'] === 'string' &&
		typeof pokemon['enName'] === 'string' &&
		Array.isArray(pokemon['types']) &&
		Array.isArray(pokemon['jaTypes']) &&
		typeof pokemon['imageUrl'] === 'string'
	);
}

/**
 * Validate and parse Pokemon list data
 * @param data - Unknown data to validate
 * @returns Array of valid Pokemon objects
 * @throws Error if data is not a valid Pokemon array
 */
export function parsePokemonList(data: unknown): Pokemon[] {
	if (!Array.isArray(data)) {
		throw new Error('Invalid Pokemon data: expected array');
	}

	const validPokemons = data.filter(isPokemon);

	if (validPokemons.length !== data.length) {
		console.warn(`Some Pokemon data was invalid: ${data.length - validPokemons.length} entries skipped`);
	}

	return validPokemons;
}
