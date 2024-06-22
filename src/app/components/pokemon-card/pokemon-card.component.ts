import { Component, input } from '@angular/core';
import { Pokemon } from '../../services/pokemon/pokemon.model';
import { DecimalPipe, NgClass, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'azp-pokemon-card',
  template: `
    <div class="pokemon-card" [ngClass]="pokemon().mainType">
      <img [src]="pokemon().image" [alt]="pokemon().name" />

      <div class="pokemon-info">
        <span> #{{ pokemon().id | number : '3.0-0' }} </span>
        <span> {{ pokemon().name | titlecase }} </span>
      </div>
    </div>
  `,
  styleUrl: './pokemon-card.component.scss',
  imports: [NgClass, DecimalPipe, TitleCasePipe],
})
export class PokemonCardComponent {
  public pokemon = input<Pokemon>();
}
