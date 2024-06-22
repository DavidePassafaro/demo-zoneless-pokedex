import { ApplicationConfig, provideExperimentalCheckNoChangesForDebug, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    // provideExperimentalCheckNoChangesForDebug({
    //   // interval:2000,
    //   useNgZoneOnStable: true,
    //   exhaustive: true
    // }),
  ],
};
