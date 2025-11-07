import { createContext, use } from 'react';
import type { Auth } from '@/utils/auth';

export interface AuthContextData {
  auth: Auth | null;
  isLoading: boolean;
  refreshAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData | null>(null);

export function useAuth() {
  const auth = use(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider!');
  }
  return auth;
}
