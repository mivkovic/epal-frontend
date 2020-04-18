import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.html'
})

export class LoginComponent {
  public loginForm: FormGroup;
  public error = null;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _modalService: ModalService
  ) {
    this._createLoginForm();
  }

  private _createLoginForm() {
    this.loginForm = this._formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],

      password: [
        '',
        Validators.compose([
          Validators.required,
        ])
      ]
    });
  }

  public submit() {
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);

      return;
    }

    this._authService.login(this.loginForm.value).then(() => {
        this._authService.authChange.next(true);
        this._modalService.close();
        this.error = null;
      }).catch(err => {
        this.error = err;
      });
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
