import { client } from '@/shared/api';
import type { RequestsResponse } from '../model/types';

export const RequestApi = {
  fetchRequests: async (page: number = 1) => {
    try {
      const res = await client.get<RequestsResponse>('/requests', {
        params: { page },
      });
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
