import classes from './model-dialog.module.css';
import { ModelCard } from '@/entities/model';
import { Button } from '@/shared/ui/button';
import { Dialog } from '@/shared/ui/dialog';
import { useModels } from '@/entities/model';

interface ModelDialogProps {
  onClose: () => void;
}

export function ModelDialog({ onClose }: ModelDialogProps) {
  const models = useModels();

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

      {models.data && (
        <div className={classes.models}>
          {models.data.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </Dialog>
  );
}
