import { getEffectiveness, type PokemonType } from './type-chart';

// globals: true なのでdescribe/it/expectはグローバルで利用可能
describe('Type Chart', () => {
	it('should return a number for any type combination', () => {
		const result = getEffectiveness('ノーマル' as PokemonType, ['ノーマル' as PokemonType]);
		expect(typeof result).toBe('number');
	});

	it('should return a positive number or zero', () => {
		const result = getEffectiveness('でんき' as PokemonType, ['みず' as PokemonType]);
		expect(result).toBeGreaterThanOrEqual(0);
	});
});
