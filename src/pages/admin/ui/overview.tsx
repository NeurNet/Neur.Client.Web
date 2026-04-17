import { BrainCircuit, Globe, Users } from 'lucide-react';
import { OverviewCard } from './overview-card';
import classes from './overview.module.css';

export function Overview() {
  return (
    <div className={classes.cards}>
      <OverviewCard
        icon={<Users size={40} strokeWidth={2.5} />}
        title="87"
        description="пользователей"
        to="/admin/users"
      />
      <OverviewCard
        icon={<Globe size={40} strokeWidth={2.5} />}
        title="3 247"
        description="запросов всего"
        to="/admin/requests"
      />
      <OverviewCard
        icon={<BrainCircuit size={40} strokeWidth={2.5} />}
        title="8"
        description="моделей"
        to="/admin/models"
      />
    </div>
  );
}
