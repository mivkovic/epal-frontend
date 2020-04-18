export interface AuthState {
  token: string;
  user: object;
}

export function createInitialAuth(): AuthState {
  return {
    user: {},
    token: ''
    /* tslint:disable */
  }
}
