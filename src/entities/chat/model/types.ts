export type MessageRole = 'user' | 'assistant';

export interface Message {
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
  messages: Message[];
}

export interface GenerateMessage {
  conversation_id: string | null;
  model_id: string | null;
  message: string;
}
