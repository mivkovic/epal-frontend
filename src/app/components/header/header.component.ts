import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import each from 'lodash/each';

@Component({
  selector: 'header-component',
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
    each(this._subscriptions, s => s.unsubscribe());
  }

  public checkIsUserLogIn() {
    this.isLoggedUser = !!localStorage.getItem('token');
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
    this._subscriptions.push(
      this._authService.authChange.subscribe(isLogged => {
        this.isLoggedUser = isLogged;
      })
    );
  }
}
