import classes from './sidebar.module.css';
import logo from '@/shared/assets/logo.png';
import { ChatButton } from './chat-button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChatApi } from '@/entities/chat';
import { Box, LogOut, SquarePen, User } from 'lucide-react';
import { SidebarButton } from './sidebar-button';
import { Link, useNavigate } from 'react-router';
import { SessionApi, useSession } from '@/entities/session';

export function Sidebar() {
  const session = useSession();

  const chats = useQuery({
    queryKey: ['chats'],
    queryFn: ChatApi.fetchChats,
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signout = useMutation({
    mutationFn: SessionApi.signout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      navigate('/signin');
    },
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

      <Link to="/">
        <SidebarButton icon={<SquarePen size={18} />}>Новый чат</SidebarButton>
      </Link>

      <span className={classes.recent}>Недавнее</span>

      <div className={classes.chats}>
        {chats.data?.map((chat) => (
          <Link key={chat.id} to={`/chat/${chat.id}`}>
            <ChatButton key={chat.id} chat={chat} />
          </Link>
        ))}
      </div>

      <div className={classes.bottom}>
        <Link to="/panel">
          <SidebarButton icon={<Box size={18} />}>Панель управления</SidebarButton>
        </Link>

        <SidebarButton icon={<LogOut size={18} />} onClick={() => signout.mutate()}>
          Выйти
        </SidebarButton>

        {session.data && (
          <div className={classes.user}>
            <User size={18} />

            <div>
              <span className={classes.name}>
                {session.data.surname} {session.data.name}
              </span>
              <span className={classes.tokens}>
                {session.data.username} | {session.data.tokens} токенов
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
