export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  user_id: string;
  user_name: string;
  name: string;
  surname: string;
  role: UserRole;
  tokens: number;
  last_request: string | null;
}

export interface TransferTokensRequest {
  user_id: string;
  token_count: number;
}

export interface UpdateRoleRequest {
  user_id: string;
  role: UserRole;
}
