import classes from './models-page.module.css';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { DashboardModelCard, useModels } from '@/entities/model';
import { CreateModelDialog } from '@/features/dashboard/models';

export function ModelsPage() {
  const models = useModels();

  const [searchText, setSearchText] = useState('');
  const [showCreateModelDialog, setShowCreateModelDialog] = useState(false);

  if (!models.data) return null;

  return (
    <>
      <title>Модели - NeurNet</title>

      <div className={classes.top}>
        <div className={classes.filters}>
          <Input
            type="text"
            placeholder="Поиск"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <Button variant="outline" size="sm" onClick={() => setShowCreateModelDialog(true)}>
          <Plus size={14} /> Добавить модель
        </Button>
      </div>

      <div className={classes.models}>
        {models.data.map((model) => (
          <DashboardModelCard key={model.id} model={model} />
        ))}
      </div>

      <CreateModelDialog
        open={showCreateModelDialog}
        onClose={() => setShowCreateModelDialog(false)}
      />
    </>
  );
}
