import { client } from '@/shared/api';
import type { Credentials } from '../model/types';
import { AxiosError } from 'axios';

export const SessionApi = {
  signin: async (data: Credentials) => {
    try {
      await client.post('/users/auth/login', data);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        throw new Error('Неверный логин или пароль!');
      }

      throw new Error('Произошла ошибка!');
    }
  },
};
