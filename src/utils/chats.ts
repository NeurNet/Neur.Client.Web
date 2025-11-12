import { fetchBackend } from './fetch';
import type { Model } from './models';

export interface CreateChatResponse {
  chatId: string;
  modelId: string;
}

export interface Chat {
  id: string;
  modelId: string;
  createdAt: string;
  updatedAt: string | null;
  model: Model;
}

export async function createChat(modelId: string): Promise<CreateChatResponse> {
  const res = await fetchBackend('/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ modelId }),
  });

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as CreateChatResponse;
}

export async function getChats(): Promise<Chat[]> {
  const res = await fetchBackend('/chats');

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as Chat[];
}

export async function getChat(chatId: string): Promise<Chat> {
  const res = await fetchBackend(`/chats/${chatId}`);

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  } else if (res.status === 404) {
    throw new Error('Не найдено!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as Chat;
}

export async function deleteChat(chatId: string) {
  const res = await fetchBackend(`/chats/${chatId}`, {
    method: 'DELETE',
  });

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  } else if (res.status === 404) {
    throw new Error('Не найдено!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }
}

export async function generateResponse(chatId: string, prompt: string) {
  const res = await fetchBackend(`/chats/${chatId}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  } else if (res.status === 404) {
    throw new Error('Не найдено!');
  }

  if (!res.ok || !res.body) {
    throw new Error('Произошла ошибка!');
  }

  return res.body.getReader();
}
