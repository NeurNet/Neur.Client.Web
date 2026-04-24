import { Button } from '@/shared/ui/button';
import classes from './add-modal-dialog.module.css';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { ModelApi } from '@/entities/model';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OllamaApi } from '@/features/ollama';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface AddModelDialogProps {
  onClose?: () => void;
}

type Inputs = {
  name: string;
  model: string;
  context: string;
  type: 'text' | 'code' | 'image';
  version: string;
  status: 'open' | 'locked';
};

export function AddModelDialog({ onClose }: AddModelDialogProps) {
  const ollamaModelsQuery = useQuery({
    queryKey: ['ollamaModels'],
    queryFn: OllamaApi.fetchOllamaModels,
  });

  const { register, handleSubmit, getValues } = useForm<Inputs>({
    defaultValues: {
      version: '1.0',
    },
  });

  const queryClient = useQueryClient();

  const addModelMutation = useMutation({
    mutationFn: ModelApi.createModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast.success(`Вы добавили модель ${getValues('name')}.`);
      if (onClose) onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <div className={classes.wrapper}>
      <div className={classes.dialog}>
        <h1 className={classes.title}>Добавить модель</h1>

        <form
          className={classes.form}
          onSubmit={handleSubmit((data) => addModelMutation.mutate(data))}
        >
          <div>
            <label className={classes.label} htmlFor="name">
              Название
            </label>
            <Input
              className={classes.input}
              placeholder="Введите название..."
              id="name"
              {...register('name', { required: true })}
            />
          </div>

          <div>
            <label className={classes.label} htmlFor="model">
              Имя модели в Ollama
            </label>

            {ollamaModelsQuery.isSuccess ? (
              <Select id="model" {...register('model', { required: true })}>
                {ollamaModelsQuery.data.map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name}
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                className={classes.input}
                placeholder="Введите имя модели в Ollama..."
                id="model"
                {...register('model', { required: true })}
              />
            )}
          </div>

          <div>
            <label className={classes.label} htmlFor="context">
              Контекст (системный промпт)
            </label>
            <Textarea
              className={classes.input}
              id="context"
              placeholder="Введите системный контекст..."
              {...register('context')}
            />
          </div>

          <div className={classes.inputGroup}>
            <div className={classes.inputGroupItem}>
              <label className={classes.label} htmlFor="type">
                Тип генерации
              </label>
              <Select id="type" {...register('type', { required: true })}>
                <option value="text">Текст</option>
                <option value="code">Код</option>
                <option value="image">Изображения</option>
              </Select>
            </div>

            <div className={classes.inputGroupItem}>
              <label className={classes.label} htmlFor="version">
                Версия
              </label>
              <Input
                className={classes.input}
                id="version"
                {...register('version', { required: true })}
              />
            </div>
          </div>

          <div>
            <label className={classes.label} htmlFor="status">
              Статус доступа
            </label>
            <Select id="status" {...register('status', { required: true })}>
              <option value="open">Публичная</option>
              <option value="locked">Приватная</option>
            </Select>
          </div>

          <div className={classes.buttons}>
            <Button variant="secondary" className={classes.button} onClick={onClose}>
              Отмена
            </Button>

            <Button className={classes.button} onClick={() => {}}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
