import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidator } from '../../../shared/validatior/custom-validator';
import { HttpService } from '../../../shared/services/http.service';

@Component({
  selector: 'register-component',
  templateUrl: './register.html'
})

export class RegisterComponent{
  public registerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _httpService: HttpService
  ) {
    this._createRegisterForm();
  }

  public submit() {
    if (!this.registerForm.valid) {
      return;
    }
    this._httpService.post('/api/v0/auth/register', this.registerForm.value).toPromise();
  }

  private _createRegisterForm() {
    this.registerForm = this._formBuilder.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ])
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
          CustomValidator.patternValidator(/\d/, { hasNumber: true }),
          CustomValidator.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidator.patternValidator(/[a-z]/, { hasSmallCase: true }),
          Validators.minLength(8),
        ])
      ],

      confirmPassword: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],

      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],

      birthday: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ],
    }, {
      validator: CustomValidator.passwordMatchValidator
   })
  }
}
