import {InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken('app.config');

export const AppConfig = {

  endpoints: {
    booksBaseUrl: '/api/books/'

  },
  snackBarDuration: 5000
};
