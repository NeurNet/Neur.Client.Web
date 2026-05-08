import classes from './overview-page.module.css';
import { useAuth } from '@/features/auth';
import { StatsBlock, useStats } from '@/entities/stats';
import { BrainCircuit, Globe, Users } from 'lucide-react';

export function OverviewPage() {
  const stats = useStats();
  const { data: auth } = useAuth();

  if (!auth) return null;

  if (stats.isPending) return null;
  if (stats.error) return <span>{stats.error.message}</span>;

  return (
    <div className={classes.stats}>
      <title>Обзор - NeurNet</title>

      <StatsBlock
        icon={<Users size={32} />}
        count={stats.data.users_count}
        name="пользователей"
        to="/dashboard/users"
      />

      {auth.role === 'admin' && (
        <>
          <StatsBlock
            icon={<Globe size={32} />}
            count={stats.data.requests_count}
            name="запросов всего"
            to="/dashboard/requests"
          />

          <StatsBlock
            icon={<BrainCircuit size={32} />}
            count={stats.data.models_count}
            name="моделей"
            to="/dashboard/models"
          />
        </>
      )}
    </div>
  );
}
