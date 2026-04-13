import type { Model } from '@/entities/model';
import classes from './model-card.module.css';

interface ModelCardProps {
  model: Model;
  onClick: () => void;
}

export function ModelCard({ model, onClick }: ModelCardProps) {
  return (
    <div className={classes.card} onClick={onClick}>
      <h1 className={classes.name}>{model.name}</h1>
      <span className={classes.model}>{model.model}</span>
    </div>
  );
}
