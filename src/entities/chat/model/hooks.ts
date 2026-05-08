import { ChatApi } from '@/entities/chat';
import { useQuery } from '@tanstack/react-query';

export function useChats() {
  return useQuery({
    queryKey: ['chats'],
    queryFn: ChatApi.fetchChats,
  });
}

export function useChat(id?: string) {
  return useQuery({
    queryKey: ['chats', id],
    queryFn: () => {
      if (!id) throw new Error('chat id is required');
      return ChatApi.fetchChatById(id);
    },
    enabled: !!id && id !== 'new',
  });
}
