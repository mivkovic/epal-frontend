import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TranslationsModule } from '../../shared/modules/translation.module';
import { AuthService } from '../../shared/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    TranslationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent
  ],
  providers: [
    AuthService
  ],
})
export class AuthModule { }
