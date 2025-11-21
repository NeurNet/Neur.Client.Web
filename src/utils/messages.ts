import { fetchBackend } from './fetch';

export interface IChatMessage {
  created_at: string;
  role: 'User' | 'Assistant';
  content: string;
}

export async function getMessages(chatId: string): Promise<IChatMessage[]> {
  const res = await fetchBackend(`/chats/${chatId}/messages`);

  if (res.status === 401) {
    throw new Error('Недостаточно прав!');
  }

  return (await res.json()) as IChatMessage[];
}
