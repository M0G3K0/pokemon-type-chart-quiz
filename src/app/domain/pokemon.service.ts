import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Pokemon, parsePokemonList } from './pokemon.schema';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private http: HttpClient) { }

  async getPokemons(): Promise<Pokemon[]> {
    const data = await firstValueFrom(this.http.get<unknown[]>('/pokemons.json'));
    return parsePokemonList(data);
  }

  async getRandomPokemon(): Promise<Pokemon> {
    const pokemons = await this.getPokemons();
    return pokemons[Math.floor(Math.random() * pokemons.length)];
  }
}
