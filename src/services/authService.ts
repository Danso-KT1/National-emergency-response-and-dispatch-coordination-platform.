import { env } from '@/lib/env';
import { storage } from '@/lib/storage';
import { mockApi } from '@/mocks/api';
import { authHttp } from './http';
import { User } from '@/types';

export const authService = {
  async login(email: string, password: string): Promise<User> {
    if (env.useMockApi) {
      const user = await mockApi.login(email, password);
      storage.setToken(user.accessToken || 'mock-token');
      storage.setUser(user);
      return user;
    }

    const { data } = await authHttp.post(`${env.authApiUrl}/auth/login`, { email, password });
    storage.setToken(data.accessToken);
    storage.setUser(data.user);
    return { ...data.user, accessToken: data.accessToken };
  },

  async getProfile(): Promise<User> {
    if (env.useMockApi) {
      return mockApi.profile();
    }
    const { data } = await authHttp.get(`${env.authApiUrl}/auth/profile`);
    return data;
  },

  logout() {
    storage.clearToken();
    storage.clearUser();
  },
};
