import clsx from 'clsx';
import classes from './model-card.module.css';
import modelAvatar from '@/shared/assets/model_avatar.png';
import toast from 'react-hot-toast';
import { ModelApi, type Model } from '@/entities/model';
import { ModelBadge } from '@/shared/ui/model-badge';
import { Button } from '../button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ModelCardProps {
  model: Model;
  onClick?: () => void;
  showControls?: boolean;
}

export function ModelCard({ model, onClick, showControls = false }: ModelCardProps) {
  const type = model.type === 'text' ? 'Текст' : model.type === 'code' ? 'Код' : 'Изображения';

  const queryClient = useQueryClient();

  const removeModelMutation = useMutation({
    mutationFn: () => ModelApi.deleteModel(model.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['models'] });
      toast.success(`Вы удалили модель ${model.name}.`);
    },
    onError: (err) => toast.error(`Произошла ошибка: ${err.message}`),
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  return (
    <div className={clsx(classes.card, onClick && classes.clickable)} onClick={onClick}>
      <div className={classes.avatar}>
        <img src={modelAvatar} alt="Model avatar" />

        <div>
          <h1 className={classes.name}>{model.name}</h1>
          <span className={classes.model}>{model.model}</span>
        </div>
      </div>

      <div className={classes.tags}>
        <ModelBadge variant="success">{type}</ModelBadge>

        {model.status === 'locked' && <ModelBadge variant="danger">Приватная модель</ModelBadge>}
      </div>

      {showControls && (
        <>
          <hr />

          <div className={classes.row}>
            <span>Версия</span>
            <span>{model.version}</span>
          </div>

          <div className={classes.row}>
            <span>Добавлена</span>
            <span>{formatDate(model.createdAt)}</span>
          </div>

          <div className={classes.controls}>
            <Button size="sm">Изменить</Button>
            <Button size="sm" variant="secondary" onClick={() => removeModelMutation.mutate()}>
              Удалить
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
