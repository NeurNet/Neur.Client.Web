import { client } from '@/shared/api';
import type { Credentials, Session } from '../model/types';
import { AxiosError } from 'axios';

export const SessionApi = {
  fetchSession: async (): Promise<Session> => {
    try {
      const res = await client.get<Session>('/users/auth');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

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

  signout: async () => {
    try {
      await client.post('/users/auth/logout');
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
