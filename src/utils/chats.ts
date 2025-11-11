import type { User } from './users';
import type { Model } from './models';
import { fetchBackend } from './fetch';

export interface CreateChatResponse {
  chatId: string;
  modelId: string;
}

export interface Chat {
  id: string;
  modelId: string;
  userId: string;
  createdAt: string;
  updatedAt: string | null;
  user: User;
  model: Model;
}

export async function createChat(modelId: string): Promise<CreateChatResponse> {
  const res = await fetchBackend('/api/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ modelId }),
  });

  if (res.status === 401) {
    throw new Error('Недостатончо прав!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as CreateChatResponse;
}

export async function getChats(): Promise<Chat[]> {
  const res = await fetchBackend('/api/chats');

  if (res.status === 401) {
    throw new Error('Недостатончо прав!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as Chat[];
}

export async function getChat(chatId: string): Promise<Chat> {
  const res = await fetchBackend(`/api/chats/${chatId}`);

  if (res.status === 401) {
    throw new Error('Недостатончо прав!');
  } else if (res.status === 404) {
    throw new Error('Не найдено!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as Chat;
}

export async function deleteChat(chatId: string) {
  const res = await fetchBackend(`/api/chats/${chatId}`, {
    method: 'DELETE',
  });

  if (res.status === 401) {
    throw new Error('Недостатончо прав!');
  } else if (res.status === 404) {
    throw new Error('Не найдено!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }
}

export async function generateResponse(chatId: string, prompt: string) {
  const res = await fetchBackend(`/api/chats/${chatId}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (res.status === 401) {
    throw new Error('Недостатончо прав!');
  } else if (res.status === 404) {
    throw new Error('Не найдено!');
  }

  if (!res.ok || !res.body) {
    throw new Error('Произошла ошибка!');
  }

  return res.body.getReader();
}
