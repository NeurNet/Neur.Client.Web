import { useState } from 'react';
import { useParams } from 'react-router';
import { SendHorizonal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/loader';
import { ErrorMessage } from '@/components/error-message';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Messages } from './Messages';
import { fetchChat, type Chat, type ChatWithMessages } from '@/api/chat';
import { sendMessage } from '@/api/message';
import classes from './Chat.module.css';

export function Chat() {
  const { chatId } = useParams();
  const [message, setMessage] = useState('');

  const queryClient = useQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => fetchChat(chatId || ''),
  });

  const sendHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!chatId) return;

    queryClient.setQueryData(
      ['chats', chatId],
      (chat: ChatWithMessages): ChatWithMessages => ({
        ...chat,
        messages: [
          ...chat.messages,
          {
            id: crypto.randomUUID(),
            chat_id: chatId,
            created_at: new Date().toISOString(),
            content: message,
            role: 'user',
          },
        ],
      }),
    );

    console.log('Sending generation request...');
    const stream = await sendMessage({ chatId, prompt: message });

    setMessage('');
    console.log(stream);
  };

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        {data.model} <span className={classes.modelName}>({data.model_name})</span>
      </h1>

      <Messages messages={data.messages} />

      <form className={classes.form} onSubmit={sendHandler}>
        <Input
          className={classes.input}
          placeholder={`Написать ${data.model}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" variant="ghost" size="icon">
          <SendHorizonal size={20} />
        </Button>
      </form>
    </div>
  );
}
