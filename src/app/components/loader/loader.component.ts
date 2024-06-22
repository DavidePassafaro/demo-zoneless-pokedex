import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'azp-loader',
  template: `
    <div class="loader" role="progressbar" aria-label="loading pokethings">
      <div class="pokeball-container">
        <div class="pokeball"></div>
      </div>
    </div>
  `,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {}
