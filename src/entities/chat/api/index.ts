import { client } from '@/shared/api';
import { AxiosError } from 'axios';
import type { Chat } from '../model/types';

export const ChatApi = {
  fetchChats: async () => {
    try {
      const res = await client.get<Chat[]>('/chats');
      return res.data;
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        throw new Error('Неверный логин или пароль!');
      }

      throw new Error('Произошла ошибка!');
    }
  },
};
