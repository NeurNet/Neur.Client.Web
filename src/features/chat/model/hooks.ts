import { ChatApi } from '@/features/chat';
import { useQuery } from '@tanstack/react-query';

export function useChats() {
  return useQuery({
    queryKey: ['chats'],
    queryFn: ChatApi.fetchChats,
  });
}
