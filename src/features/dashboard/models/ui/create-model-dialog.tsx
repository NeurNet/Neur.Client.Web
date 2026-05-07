import classes from './create-model-dialog.module.css';
import { Dialog } from '@/shared/ui/dialog';
import { type CreateModel, useCreateModel } from '@/entities/model';
import type { SubmitHandler } from 'react-hook-form';
import { ModelForm } from './model-form';

interface CreateModelDialogProps {
  open?: boolean;
  onClose?: () => void;
}

export function CreateModelDialog({ open, onClose }: CreateModelDialogProps) {
  const { mutate: createModel } = useCreateModel();

  const onSubmit: SubmitHandler<CreateModel> = (data) => {
    createModel(data);
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className={classes.title}>Добавить модель</h2>

      <ModelForm onSubmit={onSubmit} onClose={onClose} />
    </Dialog>
  );
}
