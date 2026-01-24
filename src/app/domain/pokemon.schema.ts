import { z } from 'zod';

export const PokemonSchema = z.object({
	id: z.number(),
	name: z.string(),
	types: z.array(z.string()),
	imageUrl: z.string().url(),
});

export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonListSchema = z.array(PokemonSchema);
