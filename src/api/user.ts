import { AxiosError } from 'axios';
import { client } from './client';

export type Role = 'student' | 'teacher' | 'admin';

export type CurrentUser = {
  id: string;
  username: string;
  role: Role;
  tokens: number;
};

export type User = {
  user_id: string;
  user_name: string;
  name: string;
  surname: string;
  role: Role;
  tokens: number;
};

export async function requestLogin(data: { username: string; password: string }) {
  try {
    await client.post('/users/auth/login', data);
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

export async function fetchCurrentUser() {
  const res = await client.get<CurrentUser>('/users/auth');
  return res.data;
}

export async function fetchUsers() {
  const res = await client.get<User[]>('/users');
  return res.data;
}

export async function fetchUserById(id: string) {
  // TODO: replace with real data
  return {
    user_id: id,
    user_name: 'i24s0274',
    name: 'Кирилл',
    surname: 'Сиухин',
    role: 'student',
    tokens: 10,
  } satisfies User;

  // const res = await client.get<User>(`/users/${id}`);
  // return res.data;
}

export async function transferTokens(data: { user_id: string; token_count: number }) {
  await client.post('/management/user/tokens', data);
}

export async function updateUserRole(data: { user_id: string; role: Role }) {
  await client.post('/management/user', data);
}
