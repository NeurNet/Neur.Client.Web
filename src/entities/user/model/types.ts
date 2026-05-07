export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  user_id: string;
  user_name: string;
  name: string;
  surname: string;
  role: UserRole;
  tokens: number;
  last_request: string;
}
