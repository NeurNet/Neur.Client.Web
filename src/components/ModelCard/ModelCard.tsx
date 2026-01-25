import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createChat } from '@/api/chats';
import type { Model } from '@/api/models';
import classes from './ModelCard.module.css';

export function ModelCard({ model }: { model: Model }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const creationDate = new Date(model.createdAt).toLocaleString();

  const createChatHandler = () => {
    setLoading(true);
    createChat(model.id)
      .then((chatId) => navigate(`/chat/${chatId}`))
      .finally(() => setLoading(false));
  };

  return (
    <button className={classes.card} onClick={createChatHandler} disabled={loading}>
      <h1 className={classes.name}>{model.name}</h1>

      <div className={classes.additionalInfo}>
        <span>Создано: {creationDate}</span>
        <span>v{model.version}</span>
      </div>
    </button>
  );
}
