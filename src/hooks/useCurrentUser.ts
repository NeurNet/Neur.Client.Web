import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/api/user';

export function useCurrentUser() {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
  });

  return { currentUser, isLoading };
}
