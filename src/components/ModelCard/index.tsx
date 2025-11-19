import { useNavigate } from 'react-router-dom';
import type { Model } from '@/utils/models';
import { createChat } from '@/utils/chats';
import classes from './ModelCard.module.scss';

function ModelCard({ model }: { model: Model }) {
  const navigate = useNavigate();

  const createChatHandler = () => {
    createChat(model.id)
      .then((res) => navigate(`/chat/${res.chatId}`))
      .catch(console.error);
  };

  return (
    <button className={classes.card} onClick={createChatHandler}>
      <h1>{model.name}</h1>
      <span>Имя: {model.model}</span>
      <span>Версия: {model.version}</span>
    </button>
  );
}

export default ModelCard;
