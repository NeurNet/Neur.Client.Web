import type { Chat } from './chats';

export interface User {
  id: string;
  username: string | null;
  name: string | null;
  surname: string | null;
  role: number;
  tokens: number;
  chats: Chat[] | null;
}
