import type { Model } from '@/utils/models';
import classes from './ModelCard.module.scss';

function ModelCard({ model }: { model: Model }) {
  const createChatHandler = () => {
    // TODO
  };

  return (
    <button className={classes.modelCard} onClick={createChatHandler}>
      <span>
        {model.type === 'text'
          ? 'Генерация текста'
          : model.type === 'code'
          ? 'Генерация кода'
          : 'Генерация изображений'}
      </span>

      <h1>{model.name}</h1>
      <span>Версия: {model.version}</span>
    </button>
  );
}

export default ModelCard;
