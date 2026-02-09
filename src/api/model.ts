import { client } from './client';

export type Model = {
  id: string;
  name: string;
  model: string;
  version: string;
  status: 'open' | 'locked';
  createdAt: string;
  updatedAt: string;
};

export type CreateModel = {
  name: string;
  model: string;
  type: 'text' | 'code' | 'image';
  version: string;
  status: 'open' | 'locked';
};

export async function fetchModels() {
  const res = await client.get<Model[]>('/models');
  return res.data;
}

export async function createModel(data: CreateModel) {
  await client.post('/models', data);
}
