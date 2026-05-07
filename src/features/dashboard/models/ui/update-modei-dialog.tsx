import classes from './update-model-dialog.module.css';
import { Dialog } from '@/shared/ui/dialog';
import { type CreateModel, type Model, useUpdateModel } from '@/entities/model';
import type { SubmitHandler } from 'react-hook-form';
import { ModelForm } from './model-form';

interface UpdateModelDialogProps {
  model: Model | null;
  onClose?: () => void;
}

export function UpdateModelDialog({ model, onClose }: UpdateModelDialogProps) {
  const { mutate: updateModel } = useUpdateModel();

  const onSubmit: SubmitHandler<CreateModel> = (data) => {
    if (!model) return;
    updateModel({ id: model.id, model: data });
    onClose?.();
  };

  return (
    <Dialog open={model !== null} onClose={onClose}>
      <h2 className={classes.title}>Редактировать модель</h2>

      <ModelForm model={model} onSubmit={onSubmit} onClose={onClose} />
    </Dialog>
  );
}
