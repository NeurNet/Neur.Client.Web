import { useQuery } from '@tanstack/react-query';
import { fetchModels } from '@/api/model';
import { ModelCard } from '@/components/model-card';
import classes from './Home.module.css';

export function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <>
      <h1>Доступные модели</h1>

      <div className={classes.models}>
        {data.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </>
  );
}
