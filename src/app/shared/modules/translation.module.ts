import { NgModule } from '@angular/core';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocalizationService } from '../services/localization.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  providers: [
    TranslateService,
    LocalizationService,
    {
      provide: TranslateLoader,
      useFactory: (HttpLoaderFactory),
      deps: [HttpClient]
    },
  ],
  exports: [TranslateModule]
})
export class TranslationsModule { }
