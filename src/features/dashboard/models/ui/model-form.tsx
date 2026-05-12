import classes from './model-form.module.css';
import { useOllamaModels, type CreateModel, type Model } from '@/entities/model';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Select } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { useForm } from 'react-hook-form';

interface ModelFormProps {
  model?: Model | null;
  onClose?: () => void;
  onSubmit: (data: CreateModel) => void;
}

export function ModelForm({ model, onClose, onSubmit }: ModelFormProps) {
  const { register, handleSubmit } = useForm<CreateModel>({
    defaultValues: {
      name: model?.name,
      model: model?.model,
      version: model?.version ?? '1.0',
      status: model?.status ?? 'open',
    },
  });

  const models = useOllamaModels();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.row}>
        <div className={classes.field}>
          <Label htmlFor="name">Название</Label>
          <Input
            type="text"
            id="name"
            placeholder="Введите название..."
            autoFocus
            {...register('name', { required: true })}
          />
        </div>
      </div>

      <div className={classes.row}>
        <div className={classes.field}>
          <Label htmlFor="model">Имя модели в Ollama</Label>

          {models.data ? (
            <Select>
              {models.data.map((model) => (
                <option key={model.name} value={model.name}>
                  {model.name}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              type="text"
              id="model"
              placeholder="Введите имя модели в Ollama..."
              {...register('model', { required: true })}
            />
          )}
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
  );
}
