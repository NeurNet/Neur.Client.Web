import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchChats } from '@/api/chat';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/error-message';
import { SidebarButton } from '../sidebar-button';
import classes from './ChatList.module.css';

export function ChatList() {
  const [now, setNow] = useState(() => Date.now());

  const { data, isPending, error } = useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((now - date.getTime()) / 1000);

    if (seconds < 60) return `${seconds}с`;

    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes}м`;

    const hours = Math.round(seconds / 3600);
    if (hours < 24) return `${hours}ч`;

    const days = Math.round(seconds / 86400);
    if (days < 30) return `${days}д`;

    const months = Math.round(seconds / (86400 * 30));
    if (months < 12) return `${months}мес`;

    const years = Math.round(seconds / (86400 * 365));
    return `${years}г`;
  };

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const reversedData = data.slice().reverse();

  return (
    <div className={classes.chatList}>
      {reversedData.map((chat) => (
        <Link to={`/chat/${chat.id}`} key={chat.id}>
          <SidebarButton label={timeAgo(chat.created_at)}>{chat.model_name}</SidebarButton>
        </Link>
      ))}
    </div>
  );
}
