import { client } from '@/shared/api';
import type { Model } from '../model/types';

export const ModelApi = {
  fetchModels: async (): Promise<Model[]> => {
    try {
      const res = await client.get<Model[]>('/models');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
