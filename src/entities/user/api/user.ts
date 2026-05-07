import { apiClient } from '@/shared/api';
import type { User } from '../model/types';

export const UserApi = {
  fetchUsers: async (): Promise<User[]> => {
    try {
      const res = await apiClient.get<User[]>('/users');
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
