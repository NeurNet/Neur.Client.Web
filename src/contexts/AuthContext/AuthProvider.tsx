import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchAuthenticatedUser, requestLogin, requestLogout, type Auth } from '@/utils/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (username: string, password: string) => {
    return requestLogin(username, password).then(() => refreshAuth());
  };

  const logout = async () => {
    return requestLogout().then(() => refreshAuth());
  };

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    return fetchAuthenticatedUser()
      .then((auth) => setAuth(auth))
      .catch(() => setAuth(null))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    refreshAuth().catch(console.error);
  }, [refreshAuth]);

  return (
    <AuthContext value={{ auth, isLoading, refreshAuth, login, logout }}>{children}</AuthContext>
  );
}
