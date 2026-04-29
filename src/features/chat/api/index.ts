import { client } from '@/shared/api';
import type { Chat, ChatResponse, SendMessage } from '../model/types';
import { AxiosError, type AxiosRequestConfig } from 'axios';

export const ChatApi = {
  fetchChats: async () => {
    try {
      const res = await client.get<Chat[]>('/chats');
      return res.data.reverse();
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  fetchChatById: async (id: string): Promise<Chat> => {
    if (id === 'new') {
      return {
        id: crypto.randomUUID(),
        model_id: crypto.randomUUID(),
        model_name: '',
        model: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        messages: [],
      };
    }

    try {
      const res = await client.get<Chat>(`/chats/${id}`);
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 404) {
        throw new Error('Чат не найден!');
      }

      throw new Error('Произошла ошибка!');
    }
  },

  sendMessage: async (data: SendMessage, config: AxiosRequestConfig) => {
    return client.post('/chats/generate', data, config);
  },
};
