import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CustomValidator } from '../../../shared/validatior/custom-validator';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.html'
})

export class RegisterComponent{
  public registerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this._createRegisterForm();
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
   });
  }

  public submit() {
    if (!this.registerForm.valid) {
      this.validateAllFormFields(this.registerForm);

      return;
    }

    this._authService.register(this.registerForm.value).toPromise();
  }

  public validateAllFormFields(formGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
