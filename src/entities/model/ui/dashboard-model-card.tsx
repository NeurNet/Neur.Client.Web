import type { Model } from '../model/types';
import classes from './dashboard-model-card.module.css';
import avatar from '../assets/avatar.png';
import { mapModelType } from '../lib/mapModelType';
import { Button } from '@/shared/ui/button';
import { Tag } from '@/shared/ui/tag';

interface DashboardModelCardProps {
  model: Model;
  onRemove?: () => void;
  onEdit?: () => void;
}

export function DashboardModelCard({ model, onRemove, onEdit }: DashboardModelCardProps) {
  const createdAt = new Date(model.createdAt).toLocaleDateString();

  return (
    <div className={classes.card}>
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

      <hr className={classes.divider} />

      <div className={classes.infoList}>
        <div className={classes.info}>
          <span className={classes.infoTitle}>Версия</span>
          <span>{model.version}</span>
        </div>

        <div className={classes.info}>
          <span className={classes.infoTitle}>Добавлена</span>
          <span>{createdAt}</span>
        </div>
      </div>

      <div className={classes.controls}>
        <Button size="sm" onClick={onEdit}>
          Изменить
        </Button>

        <Button size="sm" variant="outline" onClick={onRemove}>
          Удалить
        </Button>
      </div>
    </div>
  );
}
