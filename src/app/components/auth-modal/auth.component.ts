import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'auth-component',
  templateUrl: './auth.html'
})
export class AuthComponent {
  readonly LOGIN = 'login';
  readonly REGISTER = 'register';

  public currentType = this.LOGIN;

  constructor(
    private _modalService: ModalService
  ) {}

  public closeModal() {
    this._modalService.close();
  }

  public changeType(type) {
    this.currentType = type;
  }
}
