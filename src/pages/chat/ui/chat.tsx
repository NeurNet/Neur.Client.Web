import classes from './chat.module.css';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ChatApi } from '@/entities/chat';

export function Chat() {
  const { chatId } = useParams();

  const chat = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => ChatApi.fetchChat(chatId || ''),
  });

  if (!chat.data) return null;

  return (
    <div>
      <h1>{chat.data.model_name}</h1>
      <span>{chat.data.model}</span>
    </div>
  );
}
