import { useQuery } from '@tanstack/react-query';
import { getModels } from '@/api/models';
import { FullScreenLoader } from '../FullScreenLoader';
import { ModelCard } from '../ModelCard';
import classes from './ModelList.module.css';

export function ModelList() {
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
