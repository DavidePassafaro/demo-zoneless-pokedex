import { Component, ElementRef, inject, model, output, Signal, viewChild } from '@angular/core';

@Component({
  standalone: true,
  selector: 'azp-searchbar',
  template: `
    <input
      #input
      type="text"
      placeholder="Search a Pokémon"
      [value]="query()"
      (keydown.enter)="onSearch(input.value)"
    />
    <button type="submit" (click)="onSearch(input.value)">Search</button>
  `,
  styleUrl: './searchbar.component.scss',
})
export class SearchbarComponent {
  public elementRef: ElementRef = inject(ElementRef);

  public query = model<string>('');

  public search = output<string>();

  protected onSearch(query: string): void {
    this.search.emit(query);
  }
}
