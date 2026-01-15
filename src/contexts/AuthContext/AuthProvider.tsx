import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser, requestLogin, requestLogout, type CurrentUser } from '@/api/auth';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    await requestLogin(username, password);
    setUser(await getCurrentUser());
  };

  const logout = async () => {
    await requestLogout();
    setUser(null);
  };

  return <AuthContext value={{ user, loading, login, logout }}>{children}</AuthContext>;
}
