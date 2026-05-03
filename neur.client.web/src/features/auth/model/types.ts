export type UserRole = 'admin' | 'teacher' | 'student';

export interface Credentials {
  username: string;
  password: string;
}

export interface Session {
  id: string;
  username: string;
  name: string;
  surname: string;
  role: UserRole;
  tokens: number;
}
