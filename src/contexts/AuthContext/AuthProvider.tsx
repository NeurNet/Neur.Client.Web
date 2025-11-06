import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuthenticatedUser, type Auth } from '@/utils/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const refreshAuth = useCallback(() => {
    setIsLoading(true);
    getAuthenticatedUser()
      .then((auth) => setAuth(auth))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext value={{ auth, isLoading, refreshAuth }}>
      {children}
    </AuthContext>
  );
}
