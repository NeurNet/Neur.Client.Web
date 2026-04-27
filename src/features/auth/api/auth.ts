import { apiClient } from '@/shared/api';
import type { Credentials } from '../model/types';
import axios from 'axios';

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
};
