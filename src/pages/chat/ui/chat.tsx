import classes from './chat.module.css';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { ChatApi } from '@/entities/chat';
import { ChatInput } from '@/shared/ui/chat-input';

export function Chat() {
  const { chatId } = useParams();

  const chat = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => ChatApi.fetchChat(chatId || ''),
  });

  if (!chat.data) return null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.modelName}>{chat.data.model_name}</h1>
        <span className={classes.model}>{chat.data.model}</span>
      </div>

      <div className={classes.chat}></div>

      <ChatInput onSend={() => console.log()} />
      <span className={classes.disclaimer}>
        NeurNet может допускать ошибки. Проверяйте важную информацию.
      </span>
    </div>
  );
}
