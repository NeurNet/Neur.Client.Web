import classes from './create-model-dialog.module.css';
import { Input } from '@/shared/ui/input';
import { Dialog } from '@/shared/ui/dialog';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';
import { Select } from '@/shared/ui/select';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type CreateModel, useCreateModel } from '@/entities/model';

interface CreateModelDialogProps {
  open?: boolean;
  onClose?: () => void;
}

export function CreateModelDialog({ open, onClose }: CreateModelDialogProps) {
  const { register, handleSubmit, reset } = useForm<CreateModel>({
    defaultValues: { version: '1.0' },
  });

  const { mutate: createModel } = useCreateModel();

  const onSubmit: SubmitHandler<CreateModel> = (data) => {
    createModel(data);
    reset();
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className={classes.title}>Добавить модель</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="name">Название</Label>
            <Input
              type="text"
              id="name"
              placeholder="Введите название..."
              {...register('name', { required: true })}
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="model">Имя модели в Ollama</Label>
            <Input
              type="text"
              id="model"
              placeholder="Введите имя модели в Ollama..."
              {...register('model', { required: true })}
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="context">Контекст (системный промпт)</Label>
            <Textarea
              id="context"
              placeholder="Введите системный контекст..."
              {...register('context')}
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="type">Тип генерации</Label>
            <Select id="type" {...register('type', { required: true })}>
              <option value="Text">Текст</option>
              <option value="Code">Код</option>
              <option value="Image">Изображение</option>
            </Select>
          </div>

          <div className={classes.field}>
            <Label htmlFor="version">Версия</Label>
            <Input
              type="text"
              id="version"
              placeholder="Введите версию..."
              {...register('version', { required: true })}
            />
          </div>
        </div>

        <div className={classes.row}>
          <div className={classes.field}>
            <Label htmlFor="status">Статус доступа</Label>
            <Select id="status" {...register('status', { required: true })}>
              <option value="open">Публичная</option>
              <option value="locked">Закрытая</option>
            </Select>
          </div>
        </div>

        <div className={classes.row}>
          <Button type="button" variant="outline" className={classes.field} onClick={onClose}>
            Отмена
          </Button>

          <Button type="submit" className={classes.field}>
            Сохранить
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
