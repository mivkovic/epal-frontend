import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { allEnv } from 'all-env';
import each from 'lodash/each';

each(allEnv, globalVarKey  => {
  window[globalVarKey] = environment[globalVarKey] ? environment[globalVarKey] : null;
});

if (environment.ENVIRONMENT === 'production') {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
