import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchAuthenticatedUser, requestLogin, requestLogout, type AuthUser } from '@/utils/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (username: string, password: string) => {
    await requestLogin(username, password);
    await refreshAuth();
  };

  const logout = async () => {
    await requestLogout();
    await refreshAuth();
  };

  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      setAuthUser(await fetchAuthenticatedUser());
    } catch {
      setAuthUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext value={{ authUser, isLoading, refreshAuth, login, logout }}>
      {children}
    </AuthContext>
  );
}
