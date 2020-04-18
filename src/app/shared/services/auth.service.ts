import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthStore } from '../../store/auth/auth.store';
import { AuthQuery } from '../../store/auth/auth.query';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {

  public ENDPOINTS = {
    REGISTER: '/api/v0/auth/register',
    LOGIN: '/api/v0/auth/login',
    LOGOUT:  '/api/v0/auth/logout',
  }

  public authChange = new Subject<any>();
  public authChange$ = this.authChange.asObservable();

  private _header: any = {};

  public constructor(
    private _httpService: HttpService,
    private _authStore: AuthStore,
    private _authQuery: AuthQuery
  ) {
    this._header = new HttpHeaders()
    this.setDefaultUserTokenIfExist();
  }
    
  public register(data) {
    return this._httpService.post(this.ENDPOINTS.REGISTER, data);
  }

  public login(data) {
    return this._httpService.post(this.ENDPOINTS.LOGIN, data)
      .toPromise().then((response: any) => {
        this.updateAuth(response, response.access);
        this.setAuthToken(response.access);
      });
  }

  public logout() {
    return this._httpService.post(this.ENDPOINTS.LOGOUT, {}).subscribe(() => {
      this.updateAuth(null, null);
      this.removeAuthToken();
      this.authChange.next(false);
    })
  }

  public updateAuth(user, token) {
    this._authStore.updateAuth({
      user,
      token
    });
  }

  public isUserLogin() {
    return !!this._authQuery.getUser();
  }

  private removeAuthToken() {
    this._header.delete('Authorization');
    localStorage.removeItem('token');
  }

  public setAuthToken(token) {
    this._header.set('Authorization', `Bearer ${token}`);
    localStorage.setItem('token', token);
  }

  public setDefaultUserTokenIfExist() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this._header.set('Authorization', `Bearer ${token}`);

  }
}
