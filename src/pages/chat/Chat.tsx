import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getChat, type Chat } from '@/api/chats';
import { MessageList } from '@/components/chat/message-list';
import { MessageForm } from '@/components/chat/message-form';
import { FullScreenLoader } from '@/components/ui/full-screen-loader';
import classes from './Chat.module.css';

export function Chat() {
  const { chatId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => getChat(chatId ?? ''),
  });

  if (isPending) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error.message}</span>;

  return (
    <div className={classes.container}>
      <MessageList messages={data.messages} />

      <div>
        <MessageForm chatId={data.id} />
        <span className={classes.modelInfo}>
          {data?.model_name} ({data?.model})
        </span>
      </div>
    </div>
  );
}
