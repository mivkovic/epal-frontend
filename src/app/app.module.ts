import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer-component';
import { TranslationsModule } from './shared/modules/translation.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/services/http.service';
import { ModalModule } from './shared/modules/modal.module';
import { AuthComponent } from './components/auth-modal/auth.component';
import { RegisterComponent } from './components/auth-modal/register/register.component';
import { LoginComponent } from './components/auth-modal/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    TranslationsModule,
    HttpClientModule,
    ModalModule
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
