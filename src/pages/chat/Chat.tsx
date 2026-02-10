import { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchChat } from '@/api/chat';
import { sendMessage } from '@/api/message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/error-message';
import { SendHorizonal } from 'lucide-react';
import classes from './Chat.module.css';
import clsx from 'clsx';

export function Chat() {
  const { chatId } = useParams();

  const mutation = useMutation({
    mutationFn: sendMessage,
  });

  const { data, isPending, error } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => fetchChat(chatId || ''),
  });

  const [message, setMessage] = useState('');

  const sendHandler = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!chatId) return;

    mutation.mutate({ chatId, prompt: message });
  };

  if (isPending) return <span>Loading...</span>;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        {data.model} <span className={classes.modelName}>({data.model_name})</span>
      </h1>

      <div className={classes.messages}>
        {data.messages.map((message) => (
          <div
            key={message.id}
            className={clsx(classes.message, message.role === 'user' && classes.userMessage)}
          >
            {message.content}
          </div>
        ))}
      </div>

      <form className={classes.form} onSubmit={sendHandler}>
        <Input
          className={classes.input}
          placeholder={`Написать ${data.model}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Button type="submit" variant="ghost" size="icon" disabled={mutation.isPending}>
          <SendHorizonal size={20} />
        </Button>
      </form>
    </div>
  );
}
