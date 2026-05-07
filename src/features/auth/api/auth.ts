import axios from 'axios';
import { apiClient } from '@/shared/api';
import type { AuthorizedUser, Credentials } from '../model/types';

export const AuthApi = {
  login: async (credentials: Credentials) => {
    try {
      await apiClient.post('/users/auth/login', credentials);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        throw new Error('Неверное имя пользователя или пароль!', { cause: err });
      }

      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/users/auth/logout');
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  fetchUserAuth: async () => {
    try {
      const res = await apiClient.get<AuthorizedUser>('/users/auth');
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
