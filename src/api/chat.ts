import { client } from './client';

export type CreateChatResponse = {
  chatId: string;
  modelId: string;
};

export async function createChat(data: { modelId: string }) {
  const res = await client.post<CreateChatResponse>('/chats', data);
  return res.data;
}
