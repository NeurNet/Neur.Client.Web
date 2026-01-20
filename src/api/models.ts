export type Model = {
  id: string;
  name: string;
  model: string;
  type: 'text' | 'image' | 'code';
  version: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
