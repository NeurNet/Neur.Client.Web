import classes from './model-dialog.module.css';
import toast from 'react-hot-toast';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Textarea } from '@/shared/ui/textarea';
import { ModelApi, type Model, type ModelStatus, type ModelType } from '@/entities/model';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { OllamaApi } from '@/features/ollama';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface ModelDialogProps {
  onClose?: () => void;
  editModel?: Model | null;
}

type Inputs = {
  name: string;
  model: string;
  context: string;
  type: ModelType;
  version: string;
  status: ModelStatus;
};

export function ModelDialog({ onClose, editModel = null }: ModelDialogProps) {
  const ollamaModelsQuery = useQuery({
    queryKey: ['ollamaModels'],
    queryFn: OllamaApi.fetchOllamaModels,
  });

  const { register, handleSubmit, getValues } = useForm<Inputs>({
    defaultValues: {
      name: editModel?.name || '',
      model: editModel?.model || '',
      context: '',
      type: editModel?.type || 'Text',
      version: editModel?.version || '1.0',
      status: editModel?.status || 'open',
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

  const updateModelMutation = useMutation({
    mutationFn: ModelApi.updateModel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast.success(`Вы обновили модель ${getValues('name')}.`);
      if (onClose) onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (editModel) {
      updateModelMutation.mutate({ id: editModel.id, model: data });
    } else {
      addModelMutation.mutate(data);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.dialog}>
        <h1 className={classes.title}>{editModel ? 'Редактировать модель' : 'Добавить модель'}</h1>

        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                <option value="Text">Текст</option>
                <option value="Code">Код</option>
                <option value="Image">Изображения</option>
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
