import type { Message } from './messages';

export type Chat = {
  id: string;
  model_id: string;
  model_name: string;
  model: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
};

export async function createChat(modelId: string): Promise<string> {
  return `new-chat-${modelId}`;
}

export async function getChat(chatId: string): Promise<Chat> {
  return {
    id: chatId,
    model_id: '1',
    model_name: 'GPT-4',
    model: 'gpt-4',
    created_at: '2023-10-01T12:00:00Z',
    updated_at: '2023-10-10T12:00:00Z',
    messages: [],
  };
}
