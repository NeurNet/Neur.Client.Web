import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, requestLogin, requestLogout } from '@/api/user';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
  });

  const { mutate: login } = useMutation({
    mutationFn: requestLogin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUser'] }),
  });

  const { mutate: logout } = useMutation({
    mutationFn: requestLogout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['currentUser'] }),
  });

  const refreshUser = async () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return (
    <AuthContext value={{ user, isLoading, login, logout, refreshUser }}>{children}</AuthContext>
  );
}
