import { client } from '@/shared/api';
import type { Chat, ChatResponse } from '../model/types';
import { AxiosError, type AxiosRequestConfig } from 'axios';

export const ChatApi = {
  fetchChats: async () => {
    try {
      const res = await client.get<Chat[]>('/chats');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  fetchChatById: async (id: string) => {
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

  createChat: async (modelId: string): Promise<ChatResponse> => {
    try {
      const res = await client.post('/chats', { modelId });
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  sendMessage: async (chatId: string, prompt: string, config: AxiosRequestConfig) => {
    return client.post(`/chats/${chatId}/generate`, { prompt }, config);
  },
};
