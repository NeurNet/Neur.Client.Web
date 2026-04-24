import classes from './models.module.css';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ModelApi } from '@/entities/model';
import { ModelCard } from '@/shared/ui/model-card';
import { AddModelDialog } from '@/widgets/dialogs/add-model';
import { useState } from 'react';

export function Models() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: ModelApi.fetchModels,
  });

  const [showAddModelDialog, setShowAddModelDialog] = useState(false);

  if (isPending) return null;
  if (error) return <span>{error.message}</span>;

  return (
    <div>
      <div className={classes.filters}>
        <Input className={classes.search} placeholder="Поиск по названию" role="search" />
        <Button variant="secondary" size="sm" onClick={() => setShowAddModelDialog(true)}>
          + Добавить модель
        </Button>
      </div>

      <div className={classes.models}>
        {data.map((model) => (
          <ModelCard key={model.id} model={model} showControls />
        ))}
      </div>

      {showAddModelDialog && <AddModelDialog onClose={() => setShowAddModelDialog(false)} />}
    </div>
  );
}
