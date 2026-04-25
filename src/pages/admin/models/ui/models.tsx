import classes from './models.module.css';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ModelApi, type Model } from '@/entities/model';
import { ModelCard } from '@/shared/ui/model-card';
import { ModelDialog } from '@/widgets/dialogs/model';
import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';

export function Models() {
  const { data, isPending, error } = useQuery({
    queryKey: ['models'],
    queryFn: ModelApi.fetchModels,
  });

  const [showModelDialog, setShowModelDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const onModelEdit = (model: Model) => {
    setSelectedModel(model);
    setShowModelDialog(true);
  };

  const onClose = () => {
    setShowModelDialog(false);
    setSelectedModel(null);
  };

  const filteredModels = useMemo(() => {
    if (!data) return [];

    const query = searchQuery.toLowerCase();

    return data.filter(
      (m) => m.name.toLowerCase().includes(query) || m.model.toLowerCase().includes(query),
    );
  }, [data, searchQuery]);

  if (isPending) return null;
  if (error) return <span>{error.message}</span>;

  return (
    <div>
      <div className={classes.filters}>
        <Input
          className={classes.search}
          placeholder="Поиск по названию"
          role="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="secondary" size="sm" onClick={() => setShowModelDialog(true)}>
          <Plus size={16} /> Добавить модель
        </Button>
      </div>

      <div className={classes.models}>
        {filteredModels.map((model) => (
          <ModelCard key={model.id} model={model} onEdit={() => onModelEdit(model)} showControls />
        ))}
      </div>

      {showModelDialog && <ModelDialog onClose={onClose} editModel={selectedModel} />}
    </div>
  );
}
