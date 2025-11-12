import { fetchBackend } from './fetch';

export interface Model {
  id: string;
  name: string | null;
  model: string | null;
  version: string | null;
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string | null;
}

export async function getModels(): Promise<Model[]> {
  const res = await fetchBackend('/api/models');

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as Model[];
}
