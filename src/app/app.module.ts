import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { TranslationsModule } from './shared/modules/translation.module';
import { ModalModule } from './shared/modules/modal.module';
import { AuthModule } from './components/auth/auth.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer-component';
import { HttpService } from './shared/services/http.service';
import { AuthStore } from './store/auth/auth.store';
import { AuthQuery } from './store/auth/auth.query';
import { AuthService } from './shared/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    TranslationsModule,
    HttpClientModule,
    ModalModule,
    AuthModule
  ],
  providers: [
    HttpService,
    AuthStore,
    AuthQuery,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
