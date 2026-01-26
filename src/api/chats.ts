import type { Message } from './messages';

export type Chat = {
  id: string;
  model_id: string;
  model_name: string;
  model: string;
  created_at: string;
  updated_at: string | null;
  messages: Message[];
};

type CreateChatResponse = {
  chatId: string;
  modelId: string;
};

export async function createChat(modelId: string): Promise<CreateChatResponse> {
  const res = await fetch(import.meta.env.VITE_API_URL + `/chats`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ modelId }),
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return res.json();
}

export async function getChats(): Promise<Chat[]> {
  const res = await fetch(import.meta.env.VITE_API_URL + `/chats`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return res.json();
}

export async function getChat(chatId: string): Promise<Chat> {
  const res = await fetch(import.meta.env.VITE_API_URL + `/chats/${chatId}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return res.json();
}

export async function deleteChat(chatId: string) {
  const res = await fetch(import.meta.env.VITE_API_URL + `/chats/${chatId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }
}
