import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ActionReducer, provideStore} from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer} from '@ngrx/router-store';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import {localStorageSync} from 'ngrx-store-localstorage';
import {authReducer} from './store/auth/auth.reducer';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { AuthEffects } from './store/auth/auth.effects';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['auth'],
    rehydrate: true,
  })(reducer);
}

const metaReducers = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideStore({
      router: routerReducer,
      auth: authReducer,
    }, {metaReducers}),

    provideEffects([AuthEffects]),
    provideStoreDevtools(),
    provideRouterStore(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),

  ]
};
