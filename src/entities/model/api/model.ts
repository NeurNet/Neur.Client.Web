import { apiClient } from '@/shared/api';
import type { Model, CreateModel } from '../model/types';

export const ModelApi = {
  fetchModels: async (): Promise<Model[]> => {
    try {
      const res = await apiClient.get<Model[]>('/models');
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  createModel: async (model: CreateModel) => {
    try {
      await apiClient.post('/models', model);
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  updateModel: async (id: string, model: CreateModel) => {
    try {
      await apiClient.put(`/models/${id}`, model);
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  deleteModel: async (id: string) => {
    try {
      apiClient.delete(`/models/${id}`);
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
