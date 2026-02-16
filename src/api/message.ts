import { AxiosError } from 'axios';
import { client } from './client';

export type Message = {
  id: string;
  chat_id: string;
  created_at: string;
  role: 'user' | 'bot';
  content: string;
};

export async function sendMessage({ chatId, prompt }: { chatId: string; prompt: string }) {
  try {
    const res = await client.post(`/chats/${chatId}/generate`, { prompt });
    return res.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.status === 402) {
        throw new Error('Недостаточно токенов для отправки сообщения');
      }
    }

    throw new Error('Что-то пошло не так!');
  }
}
