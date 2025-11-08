export interface Model {
  id: string;
  name: string;
  version: string;
  createdAt: string;
  updatedAt: string | null;
  type: 'text' | 'code' | 'image';
  status: 'open' | 'closed';
}

export async function fetchModels(): Promise<Model[]> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/models', {
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new Error('Для доступа к моделям необходимо войти в аккаунт!');
  }

  if (!res.ok) {
    throw new Error('Не удалось получить список моделей!');
  }

  return (await res.json()) as Model[];
}

export async function createModel() {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/models', {
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new Error('Недостатончо прав для добавления модели!');
  }

  if (!res.ok) {
    throw new Error('Не удалось добавить модель!');
  }
}
