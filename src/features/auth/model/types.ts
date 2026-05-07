import type { UserRole } from '@/entities/user';

export interface AuthorizedUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  role: UserRole;
  tokens: number;
}

export interface Credentials {
  username: string;
  password: string;
}
