import classes from './models-page.module.css';
import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { DashboardModelCard, useModels, useRemoveModel, type Model } from '@/entities/model';
import { CreateModelDialog, UpdateModelDialog } from '@/features/dashboard/models';

export function ModelsPage() {
  const { data } = useModels();
  const { mutate: removeModel } = useRemoveModel();

  const [searchText, setSearchText] = useState('');
  const [showCreateModelDialog, setShowCreateModelDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const models = useMemo(() => {
    if (!data) return [];

    const q = searchText.trim().toLowerCase();

    return data.filter(
      (model) => model.name.toLowerCase().includes(q) || model.model.toLowerCase().includes(q),
    );
  }, [data, searchText]);

  if (!data) return null;

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
        {models.map((model) => (
          <DashboardModelCard
            key={model.id}
            model={model}
            onRemove={() => removeModel(model)}
            onEdit={() => setSelectedModel(model)}
          />
        ))}
      </div>

      {showCreateModelDialog && (
        <CreateModelDialog onClose={() => setShowCreateModelDialog(false)} />
      )}

      {selectedModel && (
        <UpdateModelDialog model={selectedModel} onClose={() => setSelectedModel(null)} />
      )}
    </>
  );
}
