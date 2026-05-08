import { apiClient } from '@/shared/api';
import type { RequestsResponse, UserRequestsResponse } from '../model/types';

export const RequestApi = {
  fetchRequests: async (page: number): Promise<RequestsResponse> => {
    try {
      const res = await apiClient.get<RequestsResponse>(`/requests?page=${page}`);
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  fetchUserRequests: async (userId: string, page: number): Promise<UserRequestsResponse> => {
    try {
      const res = await apiClient.get<UserRequestsResponse>(`/requests/${userId}?page=${page}&pageSize=5`);
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
