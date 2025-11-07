export interface Model {
  id: string;
  name: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  type: 'text' | 'code' | 'image';
  status: 'open' | 'closed';
}

export async function fetchModels(): Promise<Model[]> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/models', {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Не удалось получить список моделей');
  }

  return (await res.json()) as Model[];
}
