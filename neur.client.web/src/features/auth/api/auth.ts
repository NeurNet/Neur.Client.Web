import { client } from '@/shared/api';
import type { Credentials, Session } from '../model/types';

export const AuthApi = {
  login: async (credentials: Credentials) => await client.post('/users/auth/login', credentials),

  logout: async () => await client.post('/users/auth/logout'),

  fetchSession: async (): Promise<Session> => {
    const res = await client.get<Session>('/users/auth');
    return res.data;
  },
};
