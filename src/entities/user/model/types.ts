export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  user_id: string;
  user_name: string;
  name: string;
  surname: string;
  role: Role;
  tokens: number;
}
