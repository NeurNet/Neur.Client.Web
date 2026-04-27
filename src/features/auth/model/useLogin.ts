import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { AuthApi } from '../api/auth';

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      navigate('/');
    },
  });
}
