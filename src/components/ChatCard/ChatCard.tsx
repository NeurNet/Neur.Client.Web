import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { deleteChat, type Chat } from '@/api/chats';
import classes from './ChatCard.module.css';

export function ChatCard({ chat }: { chat: Chat }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteChat,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chats'] }),
  });

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString).getTime();
    const diffMs = now - date;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years}г`;
    if (days > 0) return `${days}д`;
    if (hours > 0) return `${hours}ч`;
    if (minutes > 0) return `${minutes}м`;

    return `${seconds}с`;
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof SVGElement)) {
      navigate(`/chat/${chat.id}`);
    }
  };

  return (
    <div onClick={clickHandler} className={classes.card}>
      <strong className={classes.name}>{chat.model_name}</strong>
      <span className={classes.time}>{formatDate(chat.created_at)}</span>
      <X className={classes.delete} size={16} onClick={() => mutation.mutate(chat.id)} />
    </div>
  );
}
