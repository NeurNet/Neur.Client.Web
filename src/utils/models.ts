export interface Model {
  id: string;
  name: string | null;
  modelName: string | null;
  type: 'text' | 'code' | 'image';
  version: string | null;
  status: 'open' | 'closed';
  createdAt: string;
  updatedAt: string | null;
}

export async function fetchModels(): Promise<Model[]> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/models', {
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as Model[];
}
