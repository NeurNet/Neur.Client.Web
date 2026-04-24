import { client } from '@/shared/api';
import type { Stats } from '../model/types';
import type { UserRole } from '@/entities/user';

export const AdminApi = {
  fetchStats: async () => {
    try {
      const res = await client.get<Stats>('/management/dashboard');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  transferTokens: async (user_id: string, token_count: number) => {
    try {
      await client.post('/management/user/tokens', { user_id, token_count });
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  updateRole: async (user_id: string, role: UserRole) => {
    try {
      await client.post('/management/user', { user_id, role });
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
