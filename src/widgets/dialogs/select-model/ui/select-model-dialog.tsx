import classes from './select-model-dialog.module.css';
import { Button } from '@/shared/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ModelApi } from '@/entities/model';
import { ModelCard } from '@/shared/ui/model-card';
import { Link } from 'react-router';

interface ModelDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function SelectModelDialog({ open, onClose, message }: ModelDialogProps) {
  const models = useQuery({
    queryKey: ['models'],
    queryFn: ModelApi.fetchModels,
  });

  return open ? (
    <div className={classes.wrapper}>
      <div className={classes.dialog}>
        <div className={classes.header}>
          <div>
            <h1 className={classes.title}>Выбери модель</h1>
            <span className={classes.description}>Она будет отвечать в этом чате</span>
          </div>

          <Button onClick={onClose}>Отмена</Button>
        </div>

        <div className={classes.models}>
          {models.data?.map((model) => (
            <Link
              key={model.id}
              to={`/chat/new?model_id=${model.id}&message=${encodeURI(message)}`}
            >
              <ModelCard key={model.id} model={model} clickable />
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
