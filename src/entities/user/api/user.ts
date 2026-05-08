import { apiClient } from '@/shared/api';
import type { TransferTokensRequest, UpdateRoleRequest, User } from '../model/types';
import axios from 'axios';

export const UserApi = {
  fetchUsers: async (): Promise<User[]> => {
    try {
      const res = await apiClient.get<User[]>('/users');
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  transferTokens: async (data: TransferTokensRequest) => {
    try {
      await apiClient.post('/management/user/tokens', data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 402) {
        throw new Error('Недостаточно токенов для передачи!', { cause: err });
      }

      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  updateRole: async (data: UpdateRoleRequest) => {
    try {
      await apiClient.post('/management/user', data);
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
