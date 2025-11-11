import { fetchBackend } from './fetch';

export interface AuthUser {
  id: string;
  username: string;
  tokens: number;
}

export async function requestLogin(username: string, password: string): Promise<void> {
  const res = await fetchBackend('/api/users/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (res.status === 401) {
    throw new Error('Неверный логин или пароль!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }
}

export async function requestLogout(): Promise<void> {
  const res = await fetchBackend('/api/users/auth/logout', {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Не удалось выйти из аккаунта!');
  }
}

export async function fetchAuthenticatedUser(): Promise<AuthUser> {
  const res = await fetchBackend('/api/users/auth');

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as AuthUser;
}
