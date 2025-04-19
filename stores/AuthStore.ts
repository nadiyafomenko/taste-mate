import { makeAutoObservable, runInAction } from 'mobx';
import authService from '@services/auth.service';
import { RootStore } from './RootStore';

export class AuthStore {
  isLoading = true;
  isAuthenticated = false;
  user: { firstName: string; email: string } | null = null;
  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
    this.restoreSession();
  }

  async login(email: string, password: string) {
    this.isLoading = true;

    try {
      const token = await authService.login(email, password);
      const user = await authService.getProfile(token);

      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
      });

      await this.rootStore.userStore.setCurrentUser({
        email: user.email,
        firstName: user.firstName
      });
    } catch (err) {
      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
      });
      throw err;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async signup(email: string, password: string) {
    this.isLoading = true;
    try {
      const token = await authService.signup(email, password);
      const user = await authService.getProfile(token);
      
      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
      });
      
      await this.rootStore.userStore.createUser(email);
    } catch (err) {
      throw err;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async logout() {
    await authService.logout();
    runInAction(() => {
      this.user = null;
      this.isAuthenticated = false;
    });
    this.rootStore.userStore.setCurrentUser(null);
  }

  async restoreSession() {
    try {
      const token = await authService.getStoredToken();
      if (!token) throw new Error();

      const user = await authService.getProfile(token);

      runInAction(() => {
        this.user = user;
        this.isAuthenticated = true;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.user = null;
        this.isAuthenticated = false;
        this.isLoading = false;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
