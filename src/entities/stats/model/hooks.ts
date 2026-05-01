import { useQuery } from '@tanstack/react-query';
import { StatsApi } from '../api/stats';

export function useStats() {
  return useQuery({
    queryKey: ['stats'],
    queryFn: StatsApi.fetchStats,
  });
}
