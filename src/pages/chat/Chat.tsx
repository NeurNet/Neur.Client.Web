import classes from './Chat.module.css';
import { useState } from 'react';
import { useParams } from 'react-router';
import { SendHorizonal } from 'lucide-react';
import { Loader } from '@/components/loader';
import { ErrorMessage } from '@/components/error-message';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Messages } from './Messages';
import { fetchChat, type Chat, type ChatWithMessages } from '@/api/chat';
import { sendMessage, type MessageRole } from '@/api/message';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Chat() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState('');
  const { chatId } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ['chats', chatId],
    queryFn: () => fetchChat(chatId || ''),
  });

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: async (stream) => {
      const reader = stream.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const line = decoder.decode(value, { stream: true });
        const chunk = line.replaceAll('data: ', '').replaceAll('\n\n', '');
        
        appendMessageChunk(chunk, 'bot');
        console.log(chunk);
      }
    },
  });

  const appendMessageChunk = async (chunk: string, role: MessageRole) => {
    if (!chatId) return;

    queryClient.setQueryData(['chats', chatId], (oldChat: ChatWithMessages): ChatWithMessages => {
      const messages = [...oldChat.messages];
      const lastMessage = messages[messages.length - 1];

      if (lastMessage && lastMessage.role === role) {
        const updatedLastMessage = {
          ...lastMessage,
          content: lastMessage.content + chunk,
        };
        messages[messages.length - 1] = updatedLastMessage;
      } else {
        messages.push({
          id: crypto.randomUUID(),
          chat_id: chatId,
          created_at: new Date().toISOString(),
          content: chunk,
          role,
        });
      }

      return {
        ...oldChat,
        messages,
      };
    });
  };

  const submitHandler = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!chatId) return;

    setMessage('');
    appendMessageChunk(message, 'user');

    sendMessageMutation.mutate({ chatId, prompt: message });
  };

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        {data.model} <span className={classes.modelName}>({data.model_name})</span>
      </h1>

      <Messages messages={data.messages} />

      {sendMessageMutation.error && <span>{sendMessageMutation.error.message}</span>}

      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          className={classes.input}
          placeholder={`Написать ${data.model_name}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={sendMessageMutation.isPending}
          required
        />

        <Button type="submit" variant="ghost" size="icon" disabled={sendMessageMutation.isPending}>
          <SendHorizonal size={20} />
        </Button>
      </form>
    </div>
  );
}
