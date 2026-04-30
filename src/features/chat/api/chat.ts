import { apiClient } from '@/shared/api';
import type { Chat, GenerateMessage } from '../model/types';
import type { AxiosRequestConfig } from 'axios';

export const ChatApi = {
  generateMessage: async (data: GenerateMessage, config: AxiosRequestConfig) => {
    return apiClient.post(`/chats/generate`, data, config);
  },

  fetchChats: async () => {
    try {
      const res = await apiClient.get<Chat[]>('/chats');
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  fetchChatById: async (id: string) => {
    try {
      const res = await apiClient.get<Chat>(`/chats/${id}`);
      return res.data;
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },

  deleteChatById: async (id: string) => {
    try {
      await apiClient.delete(`/chats/${id}`);
    } catch (err) {
      throw new Error('Произошла ошибка!', { cause: err });
    }
  },
};
