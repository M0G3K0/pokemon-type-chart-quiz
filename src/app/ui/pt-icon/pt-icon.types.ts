import { PokemonType } from '@domain/type-chart';

export const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export type IconColor = PokemonType | 'inverse';
