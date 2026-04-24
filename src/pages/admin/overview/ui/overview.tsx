import classes from './overview.module.css';
import { BrainCircuit, Globe, Users } from 'lucide-react';
import { OverviewCard } from './overview-card';
import { useQuery } from '@tanstack/react-query';
import { DashboardApi } from '@/features/dashboard';

export function Overview() {
  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: DashboardApi.fetchStats,
  });

  return (
    <div className={classes.cards}>
      <OverviewCard
        icon={<Users size={40} strokeWidth={2.5} />}
        title={String(statsQuery.data?.users_count || '...')}
        description="пользователей"
        to="/admin/users"
      />

      <OverviewCard
        icon={<Globe size={40} strokeWidth={2.5} />}
        title={String(statsQuery.data?.requests_count || '...')}
        description="запросов всего"
        to="/admin/requests"
      />

      <OverviewCard
        icon={<BrainCircuit size={40} strokeWidth={2.5} />}
        title={String(statsQuery.data?.models_count || '...')}
        description="моделей"
        to="/admin/models"
      />
    </div>
  );
}
