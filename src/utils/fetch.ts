import { TimeoutError } from '@/errors/TimeoutError';

export async function fetchBackend(
  path: string,
  init?: RequestInit,
  enableTimeout = true
): Promise<Response> {
  try {
    return await fetch(import.meta.env.VITE_BACKEND_URL + path, {
      ...init,
      credentials: 'include',
      signal: enableTimeout ? AbortSignal.timeout(5000) : undefined,
    });
  } catch (err) {
    if (err instanceof Error && err.name === 'TimeoutError') {
      throw new TimeoutError();
    }

    throw err;
  }
}
