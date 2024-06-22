import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MissingNoComponent } from './pages/missing-no/missing-no.component';

export const routes: Routes = [
  // Empty route
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'missing-no', component: MissingNoComponent },

  // Wildcard route
  { path: '**', redirectTo: 'missing-no' },
];
