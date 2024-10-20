import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
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
import { first } from 'rxjs';

@Component({
  standalone: true,
  selector: 'azp-home',
  imports: [AsyncPipe, Searchbar, PokemonCard, Loader],
  styleUrl: './home.component.scss',
  template: `
    <azp-searchbar #seachbar class="searchbar" (search)="filterList($event)" />
    
    @if (isLoading) {
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
  private elementRef: ElementRef = inject(ElementRef);
  private ngZone: NgZone = inject(NgZone);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private pokemonService: PokemonService = inject(PokemonService);
  protected getPokemon$ = this.pokemonService.getPokemon();

  protected pokemonList: Pokemon[] = [];
  protected isLoading: boolean = true;

  constructor() {
    this.ngZone.onMicrotaskEmpty.subscribe(() => {
      this.logger('Render');
    });

    this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.logger('First Render');
    });
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon().subscribe((pokemonList) => {
      this.isLoading = false;
      this.pokemonList = pokemonList;
    });
  }

  protected filterList(query: string): void {
    this.isLoading = true;
    this.pokemonList = [];

    this.pokemonService.getPokemonByQuery(query).subscribe((pokemonList) => {
      this.isLoading = false;
      this.pokemonList = pokemonList;
    });
  }

  private logger(message: string): void {
    console.log(message, {
      loading: this.isLoading,
      pokemonLenght: this.pokemonList.length,
    });
  }
}
