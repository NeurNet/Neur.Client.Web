import classes from './chat.module.css';
import { useParams } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatApi, type Chat } from '@/entities/chat';
import { ChatInput } from '@/shared/ui/chat-input';
import { Message } from './message';
import type { AxiosProgressEvent } from 'axios';

interface ResponseChunk {
  data: string;
  completed?: boolean;
}

export function Chat() {
  const { chatId } = useParams();
  const queryClient = useQueryClient();

  const chat = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => ChatApi.fetchChatById(chatId || ''),
  });

  const onSend = async (message: string) => {
    queryClient.setQueryData(
      ['chats', chatId],
      (oldChat: Chat): Chat => ({
        ...oldChat,
        messages: [
          ...oldChat.messages,
          {
            id: crypto.randomUUID(),
            chat_id: chatId || '',
            created_at: new Date().toISOString(),
            role: 'user',
            content: message,
          },
        ],
      }),
    );

    // await ChatApi.sendMessage(chatId || '', message, {
    //   onDownloadProgress: (e: AxiosProgressEvent) => {
    //     const response: string = e.event.target.response;
    //     response.split('\n').map((chunk) => {
    //       const parsed: ResponseChunk = JSON.parse(chunk);
    //     });
    //   },
    // });
  };

  if (!chat.data) return null;

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.modelName}>{chat.data.model}</h1>
        <span className={classes.model}>{chat.data.model_name}</span>
      </div>

      <div className={classes.chat}>
        {chat.data.messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </div>

      <ChatInput onSend={onSend} />
      <span className={classes.disclaimer}>
        NeurNet может допускать ошибки. Проверяйте важную информацию.
      </span>
    </div>
  );
}
