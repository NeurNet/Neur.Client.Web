import type { Model } from '@/entities/model';
import classes from './model-card.module.css';

interface ModelCardProps {
  model: Model;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <div className={classes.card}>
      <div className={classes.header}>
        <h3>{model.name}</h3>
        <span>{model.model}</span>
      </div>
    </div>
  );
}
