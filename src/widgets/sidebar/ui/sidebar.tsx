import classes from './sidebar.module.css';
import logo from '@/shared/assets/logo.png';
import { ChatButton } from './chat-button';
import { useQuery } from '@tanstack/react-query';
import { ChatApi } from '@/entities/chat';
import { SquarePen } from 'lucide-react';
import { SidebarButton } from './sidebar-button';
import { Link } from 'react-router';

export function Sidebar() {
  const chats = useQuery({
    queryKey: ['chats'],
    queryFn: ChatApi.fetchChats,
  });

  return (
    <aside className={classes.sidebar}>
      <div className={classes.logo}>
        <img src={logo} alt="NeurNet logo" width={56} height={56} />

        <div>
          <h1 className={classes.title}>NeurNet</h1>
          <span className={classes.description}>Нейросети колледжа</span>
        </div>
      </div>

      <SidebarButton icon={<SquarePen size={18} />}>Новый чат</SidebarButton>

      <span className={classes.recent}>Недавнее</span>

      <div className={classes.chats}>
        {chats.data?.map((chat) => (
          <Link to={`/chat/${chat.id}`}>
            <ChatButton key={chat.id} chat={chat} />
          </Link>
        ))}
      </div>
    </aside>
  );
}
