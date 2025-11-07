export interface Auth {
  id: string;
  tokens: number;
}

export async function requestLogin(username: string, password: string): Promise<void> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error('Неверный логин или пароль!');
  }
}

export async function requestLogout(): Promise<void> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Не удалось выйти из аккаунта!');
  }
}

export async function fetchAuthenticatedUser(): Promise<Auth> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/users/auth', {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Не удалось получить пользователя!');
  }

  return (await res.json()) as Auth;
}
