import { client } from '@/shared/api';
import type { Chat, ChatResponse, CreateChat } from '../model/types';

export const ChatApi = {
  fetchChats: async () => {
    try {
      const res = await client.get<Chat[]>('/chats');
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },

  createChat: async (data: CreateChat): Promise<ChatResponse> => {
    try {
      const res = await client.post('/chats', data);
      return res.data;
    } catch {
      throw new Error('Произошла ошибка!');
    }
  },
};
