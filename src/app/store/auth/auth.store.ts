import { Store, StoreConfig } from '@datorama/akita';
import { createInitialAuth, AuthState } from './auth.model';

@StoreConfig({
    name: 'auth'
})
export class AuthStore extends Store<AuthState> {
    constructor() {
        super(createInitialAuth());
    }

    updateAuth(auth) {
        this.update(auth);
    }
}
