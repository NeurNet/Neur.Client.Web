import { AxiosError } from 'axios';
import { client } from './client';

export type CurrentUser = {
  id: string;
  username: string;
  role: 'student' | 'teacher' | 'admin';
  tokens: number;
};

export async function requestLogin({ username, password }: { username: string; password: string }) {
  try {
    await client.post('/users/auth/login', { username, password });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 401) {
        throw new Error('Неверное имя пользователя или пароль!');
      }
    }

    throw new Error('Произошла ошибка!');
  }
}

export async function requestLogout() {
  await client.post('/users/auth/logout');
}

export async function getCurrentUser() {
  const res = await client.get<CurrentUser>('/users/auth');
  return res.data;
}
