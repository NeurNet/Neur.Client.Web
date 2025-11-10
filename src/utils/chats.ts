import type { User } from './users';
import type { Model } from './models';

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
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/chats', {
    method: 'POST',
    credentials: 'include',
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
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/chats', {
    credentials: 'include',
  });

  if (res.status === 401) {
    throw new Error('Недостатончо прав!');
  }

  if (!res.ok) {
    throw new Error('Произошла ошибка!');
  }

  return (await res.json()) as Chat[];
}

export async function getChat(chatId: string): Promise<Chat> {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/chats' + chatId, {
    credentials: 'include',
  });

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
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/chats/' + chatId, {
    method: 'DELETE',
    credentials: 'include',
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
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + '/api/chats/' + chatId + '/generate', {
    method: 'POST',
    credentials: 'include',
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
