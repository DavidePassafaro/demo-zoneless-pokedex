import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  concatMap,
  from,
  map,
  of,
  switchMap,
  take,
  tap,
  timer,
  toArray,
} from 'rxjs';
import { Pokemon } from './pokemon.model';
import { POKEMON_LIST_MOCK } from './pokemon.mock';

const USE_MOCK = true;

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http: HttpClient = inject(HttpClient);

  private pokemonList: Pokemon[] = [];

  getPokemon(): Observable<Pokemon[]> {
    if (USE_MOCK) {
      return timer(2000).pipe(
        concatMap(() => of(POKEMON_LIST_MOCK)),
        tap((pokemonList) => (this.pokemonList = pokemonList)),
        take(1)
      );
    }

    return this.http
      .get<{ results: { name: String; url: string }[] }>(
        'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
      )
      .pipe(
        switchMap((r) => from(r.results)),
        concatMap((res) => this.http.get<Pokemon>(res.url)),
        tap((respose) => console.log(respose)),
        map((res: any) => ({
          id: res.id,
          name: res.name,
          image: res.sprites.front_default,
          mainType: res.types[0].type.name,
        })),
        toArray(),
        tap((pokemonList) => (this.pokemonList = pokemonList)),
        tap((respose) => console.log(respose)),
        take(1)
      );
  }

  getPokemonByQuery(query: string): Observable<Pokemon[]> {
    return timer(1000).pipe(
      map(() =>
        this.pokemonList.filter((pokemon) =>
          pokemon.name.includes(query.toLocaleLowerCase())
        )
      ),
      take(1)
    );
  }
}
