import { client } from '@/shared/api';
import type { OllamaModel } from '../model/types';

export const OllamaApi = {
  fetchOllamaModels: async () => {
    try {
      const res = await client.get<OllamaModel[]>(`/ollama`);
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
