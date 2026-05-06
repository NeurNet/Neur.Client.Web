import classes from './models-page.module.css';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { DashboardModelCard, useModels } from '@/entities/model';

export function ModelsPage() {
  const models = useModels();

  if (!models.data) return null;

  return (
    <>
      <title>Модели - NeurNet</title>

      <div className={classes.top}>
        <form className={classes.filters}>
          <Input type="text" placeholder="Поиск" className={classes.searchInput} />
        </form>

        <Button variant="outline" size="sm">
          <Plus size={14} /> Добавить модель
        </Button>
      </div>

      <div className={classes.models}>
        {models.data.map((model) => (
          <DashboardModelCard key={model.id} model={model} />
        ))}
      </div>
    </>
  );
}
