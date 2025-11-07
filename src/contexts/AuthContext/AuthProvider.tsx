import { useCallback, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fetchAuthenticatedUser, requestLogin, requestLogout, type User } from '@/utils/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
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
      const user = await fetchAuthenticatedUser();
      setUser(user);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  return (
    <AuthContext value={{ user, isLoading, refreshAuth, login, logout }}>{children}</AuthContext>
  );
}
