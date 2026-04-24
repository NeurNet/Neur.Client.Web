import { client } from '@/shared/api';
import type { CreateModel, Model } from '../model/types';

export const ModelApi = {
  createModel: async (model: CreateModel) => {
    try {
      await client.post('/models', model);
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  fetchModels: async (): Promise<Model[]> => {
    try {
      const res = await client.get<Model[]>('/models');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  deleteModel: async (id: string) => {
    try {
      await client.delete(`/models/${id}`);
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
