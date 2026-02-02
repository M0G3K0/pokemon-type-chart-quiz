import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Pokemon, parsePokemonList } from './pokemon.schema';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  /** キャッシュされたポケモンリスト */
  private pokemonsCache: Pokemon[] | null = null;

  /** プリロード中の画像URLセット */
  private preloadedImages = new Set<string>();

  constructor(private http: HttpClient) { }

  /**
   * ポケモンリストを取得（キャッシュあり）
   */
  async getPokemons(): Promise<Pokemon[]> {
    if (this.pokemonsCache) {
      return this.pokemonsCache;
    }

    const data = await firstValueFrom(this.http.get<unknown[]>('/pokemons.json'));
    this.pokemonsCache = parsePokemonList(data);
    return this.pokemonsCache;
  }

  /**
   * ランダムなポケモンを取得
   */
  async getRandomPokemon(): Promise<Pokemon> {
    const pokemons = await this.getPokemons();
    return pokemons[Math.floor(Math.random() * pokemons.length)];
  }

  /**
   * ポケモン画像をプリロード
   * @param pokemon - プリロードするポケモン
   * @returns プリロード完了時に解決される Promise
   */
  preloadImage(pokemon: Pokemon): Promise<void> {
    if (this.preloadedImages.has(pokemon.imageUrl)) {
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(pokemon.imageUrl);
        resolve();
      };
      img.onerror = () => {
        // エラー時も resolve（画像読み込み失敗は許容）
        resolve();
      };
      img.src = pokemon.imageUrl;
    });
  }
}
