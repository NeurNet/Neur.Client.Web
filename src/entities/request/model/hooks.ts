import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { RequestApi } from '../api/request';

export function useRequests(page = 1) {
  return useQuery({
    queryKey: ['requests', page],
    queryFn: () => RequestApi.fetchRequests(page),
    placeholderData: keepPreviousData,
  });
}
