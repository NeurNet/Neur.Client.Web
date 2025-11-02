const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export function login(username: string, password: string): Promise<Response> {
  return fetch(BACKEND_URL + '/auth/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
}

export function logout(): Promise<Response> {
  return fetch(BACKEND_URL + '/auth/logout', {
    method: 'POST',
    credentials: 'same-origin',
  });
}
