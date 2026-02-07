import { client } from './client';

export type CurrentUser = {
  id: string;
  username: string;
  role: 'student' | 'teacher' | 'admin';
  tokens: number;
};

export async function requestLogin({ username, password }: { username: string; password: string }) {
  await client.post('/users/auth/login', { username, password });
}

export async function requestLogout() {
  await client.post('/users/auth/logout');
}

export async function getCurrentUser() {
  const res = await client.get<CurrentUser>('/users/auth');
  return res.data;
}
