import { useEffect, useState } from 'react';
import { getModels, type Model } from '@/utils/models';
import { deleteChat, getChats, type Chat } from '@/utils/chats';
import ModelCard from '@/components/ModelCard';
import ChatCard from '@/components/ChatCard';
import classes from './Home.module.scss';
import toast from 'react-hot-toast';

function ModelList() {
  const [models, setModels] = useState<Model[]>([]);
  const [modelsLoading, setModelsLoading] = useState(true);
  const [modelsError, setModelsError] = useState<string | null>(null);

  const [chats, setChats] = useState<Chat[]>([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [chatsError, setChatsError] = useState<string | null>(null);

  useEffect(() => {
    getModels()
      .then((models) => setModels(models))
      .catch((err: Error) => setModelsError(err.message))
      .finally(() => setModelsLoading(false));

    getChats()
      .then((chats) => setChats(chats))
      .catch((err: Error) => setChatsError(err.message))
      .finally(() => setChatsLoading(false));
  }, []);

  const onChatDelete = (chatId: string) => {
    deleteChat(chatId)
      .then(() => setChats((prev) => prev.filter((chat) => chat.id !== chatId)))
      .catch((err: Error) => toast.error(err.message));
  };

  return (
    <div>
      <h2>Список чатов:</h2>

      <div className={classes.models}>
        {chatsLoading ? (
          <span>Загрузка...</span>
        ) : chatsError ? (
          <span>{chatsError}</span>
        ) : chats.length === 0 ? (
          <span>Создайте первый чат, выбрав нужную модель ниже.</span>
        ) : (
          chats.map((chat) => (
            <ChatCard key={chat.id} chat={chat} onDelete={() => onChatDelete(chat.id)} />
          ))
        )}
      </div>

      <h2>Список моделей:</h2>

      <div className={classes.models}>
        {modelsLoading ? (
          <span>Загрузка...</span>
        ) : modelsError ? (
          <span>{modelsError}</span>
        ) : models.length === 0 ? (
          <span>Модели отсутствуют.</span>
        ) : (
          models.map((model) => <ModelCard key={model.id} model={model} />)
        )}
      </div>
    </div>
  );
}

export default ModelList;
