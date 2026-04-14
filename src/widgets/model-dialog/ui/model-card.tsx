import type { Model } from '@/entities/model';
import classes from './model-card.module.css';
import { Badge } from './badge';

interface ModelCardProps {
  model: Model;
  onClick: () => void;
}

export function ModelCard({ model, onClick }: ModelCardProps) {
  const type = model.type === 'text' ? 'Текст' : model.type === 'code' ? 'Код' : 'Изображения';

  return (
    <div className={classes.card} onClick={onClick}>
      <h1 className={classes.name}>{model.name}</h1>
      <span className={classes.model}>{model.model}</span>

      <div className={classes.tags}>
        <Badge variant="success">{type}</Badge>

        {model.status === 'locked' && <Badge variant="danger">Приватная модель</Badge>}
      </div>
    </div>
  );
}
