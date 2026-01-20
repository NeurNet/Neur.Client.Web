import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getChat, type Chat } from '@/api/chats';
import MessageList from '@/components/MessageList/MessageList';
import MessageForm from '@/components/MessageForm/MessageForm';
import classes from './Chat.module.css';

export default function Chat() {
  const { chatId } = useParams();

  const [data, setData] = useState<Chat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (chatId) {
      getChat(chatId)
        .then((data) => setData(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [chatId]);

  if (loading || !data) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error}</span>;
  }

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
