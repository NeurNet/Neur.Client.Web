import { useQuery } from '@tanstack/react-query';
import { getChats } from '@/api/chats';
import { FullScreenLoader } from '../FullScreenLoader';
import { ChatCard } from '../ChatCard';
import classes from './ChatList.module.css';

export function ChatList() {
  const { data, isPending, error } = useQuery({
    queryKey: ['chats'],
    queryFn: getChats,
  });

  if (isPending) return <FullScreenLoader />;
  if (error) return <span>Ошибка: {error.message}</span>;

  return (
    <div className={classes.chats}>
      <strong className={classes.title}>ЧАТЫ</strong>

      {data.length === 0 ? <span>Нет созданных чатов</span> : (
        data.map((chat) => <ChatCard chat={chat} key={chat.id} />)
      )}
    </div>
  );
}
