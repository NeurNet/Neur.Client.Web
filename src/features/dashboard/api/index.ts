import { client } from '@/shared/api';
import type { Stats } from '../model/types';

export const DashboardApi = {
  fetchStats: async () => {
    try {
      const res = await client.get<Stats>(`/management/dashboard`);
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
