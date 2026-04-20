import type { MessageRole } from '@/entities/request';

export interface IMessage {
  id: string;
  chat_id: string;
  created_at: string;
  role: MessageRole;
  content: string;
}

export interface Chat {
  id: string;
  model_id: string;
  model_name: string;
  model: string;
  created_at: string;
  updated_at: string;
  messages: IMessage[];
}

export interface ChatResponse {
  chatId: string;
  modelId: string;
}
