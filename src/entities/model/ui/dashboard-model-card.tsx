import type { Model } from '../model/types';
import classes from './dashboard-model-card.module.css';

interface DashboardModelCardProps {
  model: Model;
}

export function DashboardModelCard({ model }: DashboardModelCardProps) {
  return (
    <div className={classes.card}>
      
    </div>
  );
}
