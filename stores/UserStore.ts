import { makeAutoObservable, runInAction } from 'mobx';
import api from '@/services/api';

export interface IUser {
  id?: string;
  firstName: string;
  email: string;
}

export class UserStore {
  currentUser: IUser | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setCurrentUser(user: IUser | null) {
    this.currentUser = user;
  }

  async updateUser(userId: string, userData: Partial<IUser>) {
    this.isLoading = true;
    this.error = null;

    try {
      const { data: updatedUser } = await api.put(`/users/${userId}`, userData);

      runInAction(() => {
        if (this.currentUser?.id === userId) {
          this.currentUser = { ...this.currentUser, ...updatedUser };
        }
        this.isLoading = false;
      });

      return updatedUser;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
      throw error;
    }
  }

  async deleteUser(userId: string) {
    this.isLoading = true;
    this.error = null;

    try {
      await api.delete(`/users/${userId}`);

      runInAction(() => {
        if (this.currentUser?.id === userId) {
          this.currentUser = null;
        }
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
      throw error;
    }
  }

  async createUser(email: string) {
    this.isLoading = true;
    this.error = null;

    try {
      const { data: newUser } = await api.post('/users', { email });
      runInAction(() => {
        this.currentUser = newUser;
        this.isLoading = false;
      });
      return newUser;
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        this.isLoading = false;
      });
      throw error;
    }
  }
} 