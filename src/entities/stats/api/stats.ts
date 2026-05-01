import { apiClient } from '@/shared/api';
import type { Stats } from '../model/types';

export const StatsApi = {
  fetchStats: async (): Promise<Stats> => {
    try {
      const res = await apiClient.get<Stats>('/management/dashboard');
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
