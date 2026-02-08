import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Model } from '@/api/model';
import classes from './ModelCard.module.css';
import { createChat } from '@/api/chat';
import { useNavigate } from 'react-router';

export function ModelCard({ model }: { model: Model }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createChat,
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({ queryKey: ['chats'] });
      await navigate(`/chats/${response.chatId}`);
    },
  });

  return (
    <div className={classes.card} onClick={() => mutation.mutate({ modelId: model.id })}>
      <span className={classes.name}>
        {model.name} <span className={classes.model}>{model.model}</span>
      </span>
      <span className={classes.version}>v{model.version}</span>
    </div>
  );
}
