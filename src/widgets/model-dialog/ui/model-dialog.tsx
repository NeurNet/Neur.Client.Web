import classes from './model-dialog.module.css';
import { Button } from '@/shared/ui/button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ModelApi } from '@/entities/model';
import { ChatApi } from '@/entities/chat';
import { ModelCard } from './model-card';
import { useNavigate } from 'react-router';

interface ModelDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ModelDialog({ open, onClose }: ModelDialogProps) {
  const models = useQuery({
    queryKey: ['models'],
    queryFn: ModelApi.fetchModels,
  });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createChat = useMutation({
    mutationFn: ChatApi.createChat,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      navigate(`/chat/${data.chatId}`);
    },
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
            <ModelCard key={model.id} model={model} onClick={() => createChat.mutate(model.id)} />
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
