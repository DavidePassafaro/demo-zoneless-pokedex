import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnInit,
  Signal,
  ViewChild,
  afterNextRender,
  afterRender,
  inject,
  signal,
  viewChild,
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
    
    @if (isLoading()) {
      <azp-loader />
    }

    <ol class="row">
      @for (pokemon of pokemonList(); track pokemon.id) {
        <li class="col">
          <azp-pokemon-card [pokemon]="pokemon" />
        </li>
      }
    </ol>
  `,
})
export class HomeComponent implements OnInit {
  private searchbar: Signal<Searchbar> = viewChild(Searchbar);

  private ngZone: NgZone = inject(NgZone);
  private changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private pokemonService: PokemonService = inject(PokemonService);
  protected getPokemon$ = this.pokemonService.getPokemon();

  protected pokemonList = signal<Pokemon[]>([]);
  protected isLoading = signal<boolean>(true);

  constructor() {
    afterRender(() => {
      this.logger('Render');
    });

    afterNextRender(() => {
      this.logger('First Render');
    });

    this.initializeColorChange();
  }

  ngOnInit(): void {
    this.pokemonService.getPokemon().subscribe((pokemonList) => {
      this.isLoading.set(false);
      this.pokemonList.set(pokemonList);
    });
  }

  protected filterList(query: string): void {
    this.isLoading.set(true);
    this.pokemonList.set([]);

    this.pokemonService.getPokemonByQuery(query).subscribe((pokemonList) => {
      this.isLoading.set(false);
      this.pokemonList.set(pokemonList);
    });
  }

  private logger(message: string): void {
    console.log(message, {
      loading: this.isLoading(),
      pokemonLenght: this.pokemonList().length,
    });
  }

  private initializeColorChange(): void {
    const colors = [
      'green',
      'red',
      'rgb(1, 1, 126)',
      'blue',
      'rgb(135, 135, 135',
      'rgb(40, 1, 50)',
      'rgb(146, 153, 45)',
      'rgb(126, 83, 1)',
      'rgb(171, 83, 205)',
      'rgb(191, 150, 51)',
      'rgb(145, 49, 182)',
      'rgb(126, 83, 1)',
      'rgb(151, 108, 168)',
      'rgb(83, 200, 205)',
      'rgb(83, 141, 205)',
    ];
    let currentColorIndex = 0;

    setInterval(() => {
      currentColorIndex = (currentColorIndex + 1) % colors.length;

      this.searchbar().elementRef.nativeElement.setAttribute(
        'style',
        `--highlight-color: ${colors[currentColorIndex]}`
      );
    }, 2000);
  }
}
