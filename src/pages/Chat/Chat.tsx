import { useEffect, useState, type FormEvent } from 'react';
import { useParams } from 'react-router';
import { getChat, type Chat } from '@/api/chats';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Button';
import ChatMessage from '@/components/ChatMessage/ChatMessage';
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.messages}>
        <ChatMessage className={classes.messageRight} author="User">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus ex enim illum
          dolorem sed eaque officia veritatis placeat nobis! Ex voluptate laudantium fugiat
          necessitatibus qui, libero perspiciatis iste totam maxime.
        </ChatMessage>
        <ChatMessage author={data!.model}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus ex enim illum
          dolorem sed eaque officia veritatis placeat nobis! Ex voluptate laudantium fugiat
          necessitatibus qui, libero perspiciatis iste totam maxime.
        </ChatMessage>
      </div>

      <div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Input placeholder="Напишите что-нибудь" className={classes.input} required />
          <Button type="submit">Отправить</Button>
        </form>
        <span className={classes.modelInfo}>
          {data?.model_name} ({data?.model})
        </span>
      </div>
    </div>
  );
}
