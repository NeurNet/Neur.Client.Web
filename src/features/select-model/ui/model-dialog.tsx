import classes from './model-dialog.module.css';
import { Button } from '@/shared/ui/button';
import { Dialog, type DialogProps } from '@/shared/ui/dialog';

export function ModelDialog({ onClose, open }: DialogProps) {
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
    </Dialog>
  );
}
