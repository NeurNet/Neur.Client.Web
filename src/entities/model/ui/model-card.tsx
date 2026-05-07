import classes from './model-card.module.css';
import avatar from '../assets/avatar.png';
import { Tag } from '@/shared/ui/tag';
import { mapModelType } from '../lib/mapModelType';
import type { Model } from '../model/types';

interface ModelCardProps {
  model: Model;
  onClick?: () => void;
}

export function ModelCard({ model, onClick }: ModelCardProps) {
  return (
    <div className={classes.card} onClick={onClick}>
      <div className={classes.top}>
        <img src={avatar} alt="Model avatar" />

        <div>
          <h3 className={classes.name}>{model.name}</h3>
          <span className={classes.model}>{model.model}</span>
        </div>
      </div>

      <div className={classes.tags}>
        <Tag variant="success">{mapModelType(model.type)}</Tag>

        {model.status === 'locked' && <Tag variant="error">Приватная модель</Tag>}
      </div>
    </div>
  );
}
