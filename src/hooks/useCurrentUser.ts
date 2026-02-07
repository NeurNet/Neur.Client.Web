import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/api/user';

export function useCurrentUser() {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { currentUser, isLoading };
}
