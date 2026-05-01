import { useQuery } from '@tanstack/react-query';
import { ModelApi } from '../api/model';

export function useModels() {
  return useQuery({
    queryKey: ['models'],
    queryFn: ModelApi.fetchModels,
  });
}
