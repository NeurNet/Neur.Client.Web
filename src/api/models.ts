export type ModelType = 'text' | 'image' | 'code';
export type ModelStatus = 'open' | 'locked';

export type CreateModel = {
  name: string;
  model: string;
  type: ModelType;
  version: string;
  status: ModelStatus;
};

export type Model = {
  id: string;
  name: string;
  model: string;
  version: string;
  status: ModelStatus;
  createdAt: string;
  updatedAt: string | null;
};

export async function getModels(): Promise<Model[]> {
  const res = await fetch(import.meta.env.VITE_API_URL + `/models`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return res.json();
}

export async function createModel(model: CreateModel) {
  return fetch(import.meta.env.VITE_API_URL + `/models`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(model),
  });
}
