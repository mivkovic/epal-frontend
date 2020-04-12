import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as en from '../../../assets/i18n/en.json';

@Injectable()
export class LocalizationService {
  public defaultLocale = 'en';

  public constructor(
    private translate: TranslateService,
  ) {}

  public setInitTranslations() {
    this.translate.setTranslation(this.defaultLocale, (en as any).default);
    this.translate.use(this.defaultLocale);
  }
}
