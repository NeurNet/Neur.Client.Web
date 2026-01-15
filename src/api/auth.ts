export type CurrentUser = {
  id: string;
  username: string;
  role: string;
  tokens: number;
};

export async function requestLogin(username: string, password: string): Promise<void> {
  const res = await fetch(import.meta.env.VITE_API_URL + '/users/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Не удалось войти в систему');
    }

    throw new Error('Произошла ошибка!');
  }
}

export async function getCurrentUser(): Promise<CurrentUser> {
  const res = await fetch(import.meta.env.VITE_API_URL + '/users/auth', {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return res.json();
}

export async function requestLogout(): Promise<void> {
  const res = await fetch(import.meta.env.VITE_API_URL + '/users/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }
}
