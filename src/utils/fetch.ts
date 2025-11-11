export function fetchBackend(path: string, init?: RequestInit): Promise<Response> {
  return fetch(import.meta.env.VITE_BACKEND_URL + path, {
    ...init,
    credentials: 'include',
  });
}
