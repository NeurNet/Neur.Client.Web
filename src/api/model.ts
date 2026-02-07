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

export async function fetchModels() {
  const res = await client.get<Model[]>('/models');
  return res.data;
}
