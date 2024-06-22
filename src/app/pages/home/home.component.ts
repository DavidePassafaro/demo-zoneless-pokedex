import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { PokemonCardComponent as PokemonCard } from '../../components/pokemon-card/pokemon-card.component';
import { SearchbarComponent as Searchbar } from '../../components/searchbar/searchbar.component';
import { LoaderComponent as Loader } from '../../components/loader/loader.component';
import { Pokemon } from '../../services/pokemon/pokemon.model';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'azp-home',
  imports: [AsyncPipe, Searchbar, PokemonCard, Loader],
  styleUrl: './home.component.scss',
  template: `
    <azp-searchbar #seachbar class="searchbar" (search)="filterList($event)" />

    @if(pokemonList.length === 0){
    <azp-loader />
    }

    <ol class="row">
      @for (pokemon of pokemonList; track pokemon.id) {
      <li class="col">
        <azp-pokemon-card [pokemon]="pokemon" />
      </li>
      }
    </ol>
  `,
})
export class HomeComponent implements OnInit {
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private pokemonService: PokemonService = inject(PokemonService);
  protected getPokemon$ = this.pokemonService.getPokemon();

  protected pokemonList: Pokemon[] = [];

  ngOnInit(): void {
    this.pokemonService.getPokemon().subscribe((pokemonList) => {
      this.pokemonList = pokemonList;
    });
  }

  protected filterList(query: string): void {
    this.pokemonService.getPokemonByQuery(query).subscribe((pokemonList) => {
      this.pokemonList = pokemonList;
    });
  }
}
