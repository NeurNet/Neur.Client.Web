export type UserRole = 'admin' | 'teacher' | 'student';

export interface UserAuth {
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
