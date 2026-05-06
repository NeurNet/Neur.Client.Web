import classes from './model-dialog.module.css';
import { Button } from '@/shared/ui/button';
import { Dialog, type DialogProps } from '@/shared/ui/dialog';
import { ModelCard } from './model-card';
import { useModels } from '@/entities/model';

export function ModelDialog({ onClose, open }: DialogProps) {
  const models = useModels();

  return (
    <Dialog onClose={onClose} open={open}>
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
