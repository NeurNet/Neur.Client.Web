import { useEffect, useState } from 'react';
import { getModels, type Model } from '@/utils/models';
import { getChats, type Chat } from '@/utils/chats';
import ModelCard from '@/components/ModelCard';
import ChatCard from '@/components/ChatCard';
import classes from './Home.module.scss';

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

  return (
    <div>
      <h2>Список чатов:</h2>

      <div className={classes.models}>
        {chatsLoading ? (
          <span>Загрузка...</span>
        ) : chats.length === 0 ? (
          <span>Создайте первый чат, выбрав нужную модель ниже.</span>
        ) : (
          chatsError ?? chats.map((chat) => <ChatCard chat={chat} key={chat.id} />)
        )}
      </div>

      <h2>Список моделей:</h2>

      <div className={classes.models}>
        {modelsLoading ? (
          <span>Загрузка...</span>
        ) : models.length === 0 ? (
          <span>Модели отсутствуют.</span>
        ) : (
          modelsError ?? models.map((model) => <ModelCard model={model} key={model.id} />)
        )}
      </div>
    </div>
  );
}

export default ModelList;
