import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CaseSensitive, Code, Image } from 'lucide-react';
import { createChat } from '@/api/chats';
import type { Model } from '@/api/models';
import classes from './ModelCard.module.css';

export default function ModelCard({ model }: { model: Model }) {
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
      <span>
        Генерация{' '}
        {model.type === 'text' ? 'текста' : model.type === 'image' ? 'изображений' : 'кода'}
      </span>

      <div className={classes.info}>
        {model.type === 'text' ? (
          <CaseSensitive color="#CA0505" size={80} />
        ) : model.type === 'image' ? (
          <Image color="#0CCA05" size={80} />
        ) : (
          <Code color="#9605CA" size={80} />
        )}
        <h1 className={classes.name}>{model.name}</h1>
      </div>

      <div className={classes.additionalInfo}>
        <span>Создано: {creationDate}</span>
        <span>v{model.version}</span>
      </div>
    </button>
  );
}
