import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { AuthState } from './auth.model';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  public getUser() {
    return this.getValue().user;
  }

  public getToken() {
    return this.getValue().token;
  }
}

