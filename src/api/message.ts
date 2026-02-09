import { client } from './client';

export type Message = {
  id: string;
  chat_id: string;
  created_at: string;
  role: 'user' | 'bot';
  content: string;
};

export async function sendMessage({ chatId, prompt }: { chatId: string; prompt: string }) {
  const res = await client.post(`/chats/${chatId}/generate`, { prompt });
  console.log(res);
}
