import { client } from '@/shared/api';
import type { User } from '../model/types';

export const UserApi = {
  fetchUsers: async (): Promise<User[]> => {
    try {
      const users = await client.get<User[]>('/users');
      return users.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
