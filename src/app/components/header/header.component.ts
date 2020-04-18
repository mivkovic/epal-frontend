import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import forEach from 'lodash/forEach';
import { LocalstorageService } from '../../shared/services/localstorage.service';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.html'
})

export class HeaderComponent implements OnInit, OnDestroy{
  public isLoggedUser = false;
  private _subscriptions: Subscription[] = [];

  constructor(
    private _modalService: ModalService,
    private _authService: AuthService
  ) {}

  public ngOnInit() {
    this._subscribeToAuthChange();
    this.checkIsUserLogIn();
  }

  public ngOnDestroy() {
    forEach(this._subscriptions, s => s.unsubscribe());
  }

  public checkIsUserLogIn() {
    this.isLoggedUser = !!LocalstorageService.getItem('token');
  }

  public openAuthModal() {
    this._modalService.open(
      AuthComponent
    );
  }

  public logout() {
    this._authService.logout();
  }

  private _subscribeToAuthChange() {
    this._subscriptions.push(
      this._authService.authChange.subscribe(isLogged => {
        this.isLoggedUser = isLogged;
      })
    );
  }
}
