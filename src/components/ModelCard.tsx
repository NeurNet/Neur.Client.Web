import { useNavigate } from 'react-router-dom';
import type { Model } from '@/utils/models';
import { createChat } from '@/utils/chats';

function ModelCard({ model }: { model: Model }) {
  const navigate = useNavigate();

  const createChatHandler = () => {
    createChat(model.id)
      .then((res) => navigate(`/chat/${res.chatId}`))
      .catch(console.error);
  };

  return (
    <button className="card" onClick={createChatHandler}>
      <h1>{model.name}</h1>
      <span>Имя: {model.model}</span>
      <span>Версия: {model.version}</span>
    </button>
  );
}

export default ModelCard;
