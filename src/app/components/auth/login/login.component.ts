import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'login-component',
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
      return;
    }
    
    this._authService.login(this.loginForm.value).subscribe(
      (response: any) => {
        this._authService.updateAuth(response, response.access);
        this._authService.setAuthToken(response.access);
        this._authService.authChange.next(true);
        this._modalService.close();
        this.error = null;
      },
      (err) => {
        this.error = err;
      }
    )
  }
}
