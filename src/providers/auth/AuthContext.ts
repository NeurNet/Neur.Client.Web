import { createContext, useContext } from 'react';
import type { CurrentUser } from '@/api/user';

export type AuthContextType = {
  user?: CurrentUser;
  isLoading: boolean;
  login: ({ username, password }: { username: string; password: string }) => void;
  logout: () => void;
  refreshUser: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider!');
  }

  return auth;
}
