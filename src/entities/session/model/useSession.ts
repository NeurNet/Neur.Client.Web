import { useQuery } from '@tanstack/react-query';
import { SessionApi } from '../api';

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: SessionApi.fetchSession,
    retry: false,
  });
}
