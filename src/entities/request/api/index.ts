import { client } from '@/shared/api';
import type { IRequest } from '../model/types';

export const RequestApi = {
  fetchRequests: async () => {
    try {
      const res = await client.get<IRequest[]>('/requests');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
