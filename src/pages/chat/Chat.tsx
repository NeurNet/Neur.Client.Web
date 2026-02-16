import { useState } from 'react';
import { useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SendHorizonal } from 'lucide-react';
import { fetchChat } from '@/api/chat';
import { sendMessage } from '@/api/message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ErrorMessage } from '@/components/error-message';
import { Loader } from '@/components/loader';
import { Messages } from './Messages';
import classes from './Chat.module.css';

export function Chat() {
  const { chatId } = useParams();

  const [message, setMessage] = useState('');

  const { data, isPending, error } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => fetchChat(chatId || ''),
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: async () => {
      setMessage('');
      await queryClient.invalidateQueries({ queryKey: ['chats', chatId] });
    },
  });

  const sendHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!chatId) return;

    mutation.mutate({ chatId, prompt: message });
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
        <Button type="submit" variant="ghost" size="icon" disabled={mutation.isPending}>
          <SendHorizonal size={20} />
        </Button>
      </form>

      {mutation.error && <span>{mutation.error.message}</span>}
    </div>
  );
}
