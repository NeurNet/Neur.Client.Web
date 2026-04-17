import { Input } from '@/shared/ui/input';
import classes from './models.module.css';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ModelApi } from '@/entities/model';
import { ModelCard } from '@/shared/ui/model-card';

export function Models() {
  const models = useQuery({
    queryKey: ['models'],
    queryFn: ModelApi.fetchModels,
  });

  if (models.isPending) return null;
  if (models.error) return <span>{models.error.message}</span>;

  return (
    <div>
      <div className={classes.filters}>
        <Input className={classes.search} placeholder="Поиск по названию" role="search" />
        <Button variant="secondary" size="sm">
          + Добавить модель
        </Button>
      </div>

      <div className={classes.models}>
        {models.data.map((model) => (
          <ModelCard key={model.id} model={model} showControls />
        ))}
      </div>
    </div>
  );
}
