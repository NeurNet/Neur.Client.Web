export type Role = 'student' | 'teacher' | 'admin';

export async function setUserTokens(userId: string, tokens: number) {
  const res = await fetch(import.meta.env.VITE_API_URL + `/management/user/tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userId, tokens }),
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }
}

export async function setUserRole(userId: string, role: Role) {
  const res = await fetch(import.meta.env.VITE_API_URL + `/management/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userId, role }),
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }
}
