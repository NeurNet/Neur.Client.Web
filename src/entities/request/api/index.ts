import { client } from '@/shared/api';
import type { RequestsResponse } from '../model/types';

export const RequestApi = {
  fetchRequests: async () => {
    try {
      const res = await client.get<RequestsResponse>('/requests');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
