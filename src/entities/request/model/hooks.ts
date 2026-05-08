import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RequestApi } from '../api/request';

export function useRequests(page = 1) {
  return useQuery({
    queryKey: ['requests', page],
    queryFn: () => RequestApi.fetchRequests(page),
    placeholderData: keepPreviousData,
  });
}

export function useUserRequests(userId?: string, page = 1) {
  return useQuery({
    queryKey: ['users', userId, 'requests', page],
    queryFn: () => {
      if (!userId) throw new Error('userId is required');

      return RequestApi.fetchUserRequests(userId, page);
    },
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
}
