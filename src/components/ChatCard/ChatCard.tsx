import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import type { Chat } from '@/api/chats';
import classes from './ChatCard.module.css';

export function ChatCard({ chat }: { chat: Chat }) {
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

  return (
    <Link to={`/chat/${chat.id}`} className={classes.card}>
      <strong className={classes.name}>{chat.model_name}</strong>
      <span className={classes.time}>{formatDate(chat.created_at)}</span>
    </Link>
  );
}
