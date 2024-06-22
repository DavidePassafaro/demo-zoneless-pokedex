export type PokemonType =
  | 'grass'
  | 'fire'
  | 'water'
  | 'bug'
  | 'normal'
  | 'poison'
  | 'electric'
  | 'ground'
  | 'fairy'
  | 'fighting'
  | 'psychic'
  | 'rock'
  | 'ghost'
  | 'ice'
  | 'dragon';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  mainType: PokemonType;
}
