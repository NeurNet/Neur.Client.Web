import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getChat, type Chat } from '@/api/chats';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
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

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className={classes.container}>
      <div></div>

      <div>
        <form className={classes.form}>
          <Input placeholder="Напишите что-нибудь" required />
          <Button type="submit">Отправить</Button>
        </form>
        <span className={classes.modelInfo}>{data?.model_name} ({data?.model})</span>
      </div>
    </div>
  );
}
