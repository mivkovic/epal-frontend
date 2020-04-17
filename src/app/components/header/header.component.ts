import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.html'
})

export class HeaderComponent {
  public isLoggedUser = false;

  constructor(
    private _modalService: ModalService,
    private _authService: AuthService
  ) {}

  public ngOnInit() {
    this._subscribeToAuthChange();
  }

  public openAuthModal() {
    this._modalService.open(
      AuthComponent
    )
  }

  public logout() {
    this._authService.logout();
  }

  private _subscribeToAuthChange() {
    this._authService.authChange.subscribe(isLogged => {
      this.isLoggedUser = isLogged;
    })
  }
}
