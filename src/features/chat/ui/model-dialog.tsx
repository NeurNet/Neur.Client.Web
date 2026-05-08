import classes from './model-dialog.module.css';
import { ModelCard, useModels } from '@/entities/model';
import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';

interface ModelDialogProps {
  onClose: () => void;
  onModelSelect?: (modelId: string) => void;
}

export function ModelDialog({ onClose, onModelSelect }: ModelDialogProps) {
  const { data: models } = useModels();

  if (!models) return null;

  return (
    <Dialog onClose={onClose}>
      <div className={classes.header}>
        <div>
          <h2 className={classes.title}>Выбери модель</h2>
          <span className={classes.description}>Она будет отвечать в этом чате</span>
        </div>

        <Button size="xl" onClick={onClose}>
          Отмена
        </Button>
      </div>

      <div className={classes.models}>
        {models.map((model) => (
          <ModelCard key={model.id} model={model} onClick={() => onModelSelect?.(model.id)} />
        ))}
      </div>
    </Dialog>
  );
}
