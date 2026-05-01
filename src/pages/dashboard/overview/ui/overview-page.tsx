import classes from './overview-page.module.css';
import { StatsBlock } from '@/entities/stats';
import { useStats } from '@/entities/stats';
import { BrainCircuit, Globe, Users } from 'lucide-react';

export function OverviewPage() {
  const stats = useStats();

  if (stats.isPending) return null;
  if (stats.error) return <span>{stats.error.message}</span>;

  return (
    <div className={classes.stats}>
      <StatsBlock
        icon={<Users size={40} strokeWidth={2.4} />}
        count={stats.data.users_count}
        name="пользователей"
        to="/dashboard/users"
      />

      <StatsBlock
        icon={<Globe size={40} strokeWidth={2.4} />}
        count={stats.data.requests_count}
        name="запросов всего"
        to="/dashboard/requests"
      />

      <StatsBlock
        icon={<BrainCircuit size={40} strokeWidth={2.4} />}
        count={stats.data.models_count}
        name="моделей"
        to="/dashboard/models"
      />
    </div>
  );
}
