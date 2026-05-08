import { useQuery } from '@tanstack/react-query';
import { UserApi } from '../api/user';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: UserApi.fetchUsers,
  });
}
