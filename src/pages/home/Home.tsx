import { useQuery } from '@tanstack/react-query';
import { ModelCard } from '@/components/model-card';
import { ErrorMessage } from '@/components/error-message';
import { Loader } from '@/components/loader';
import { fetchModels } from '@/api/model';
import classes from './Home.module.css';

export function Home() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: fetchModels,
  });

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

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
