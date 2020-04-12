import { Component } from '@angular/core';
import { LocalizationService } from './shared/services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor (
    private localizationService: LocalizationService
  ) {
    this.localizationService.setInitTranslations();
  }
}
