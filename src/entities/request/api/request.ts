import { apiClient } from '@/shared/api';
import type { RequestsResponse } from '../model/types';

export const RequestApi = {
  fetchRequests: async (page: number): Promise<RequestsResponse> => {
    try {
      const res = await apiClient.get<RequestsResponse>(`/requests?page=${page}`);
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
