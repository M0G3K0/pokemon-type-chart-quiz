import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, firstValueFrom } from 'rxjs';
import { Pokemon, PokemonListSchema } from './pokemon.schema';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) { }

  async getPokemons(): Promise<Pokemon[]> {
    const data = await firstValueFrom(this.http.get<any[]>('/pokemons.json'));
    return PokemonListSchema.parse(data);
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const pokemons = await this.getPokemons();
    return pokemons[Math.floor(Math.random() * pokemons.length)];
  }
}
