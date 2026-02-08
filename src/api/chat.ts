import { client } from './client';
import type { Message } from './message';

export type Chat = {
  id: string;
  model_id: string;
  model_name: string;
  model: string;
  created_at: string;
  updated_at: string;
};

export type ChatWithMessages = Chat & {
  messages: Message[];
};

export type CreateChatResponse = {
  chatId: string;
  modelId: string;
};

export async function createChat(data: { modelId: string }) {
  const res = await client.post<CreateChatResponse>('/chats', data);
  return res.data;
}

export async function fetchChats() {
  const res = await client.get<Chat[]>('/chats');
  return res.data;
}

export async function fetchChat(chatId: string) {
  const res = await client.get<ChatWithMessages>(`/chats/${chatId}`);
  return res.data;
}
