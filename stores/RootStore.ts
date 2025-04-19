import { AuthStore } from './AuthStore';
import { UserStore } from './UserStore';

export class RootStore {
  authStore: AuthStore;
  userStore: UserStore;

  constructor() {
    this.userStore = new UserStore();
    this.authStore = new AuthStore(this);
  }
}