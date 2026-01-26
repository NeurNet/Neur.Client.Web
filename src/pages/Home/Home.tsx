import { useQuery } from '@tanstack/react-query';
import { getModels } from '@/api/models';
import { ModelCard } from '@/components/ModelCard';
import { FullScreenLoader } from '@/components/FullScreenLoader';
import classes from './Home.module.css';

export function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: getModels,
  });

  if (isPending) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error.message}</span>;

  return (
    <div className={classes.models}>
      {data.length === 0 ? (
        <span>Нет доступных моделей!</span>
      ) : (
        data.map((model) => <ModelCard key={model.id} model={model} />)
      )}
    </div>
  );
}
