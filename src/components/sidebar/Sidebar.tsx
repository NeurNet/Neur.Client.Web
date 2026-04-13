import { Link, useNavigate } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { requestLogout } from '@/api/user';
import { LogOut, Settings, SquarePen, User } from 'lucide-react';
import { SidebarButton } from './sidebar-button';
import { Loader } from '../loader';
import classes from './Sidebar.module.css';
import logo from '@/assets/logo.png';
import { fetchChats } from '@/api/chat';
import { ChatCard } from './ChatCard';

export function Sidebar() {
  const { currentUser } = useCurrentUser();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const chats = useQuery({
    queryKey: ['chats'],
    queryFn: fetchChats,
  });

  const { mutate: logout, isPending } = useMutation({
    mutationFn: requestLogout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      await navigate('/login');
    },
  });

  if (!currentUser) return <Loader />;

  return (
    <nav className={classes.sidebar}>
      <div className={classes.logo}>
        <img src={logo} alt="NeurNet logo" width={56} height={56} />

        <div className={classes.logoText}>
          <span className={classes.name}>NeurNet</span>
          <span className={classes.description}>Нейросети колледжа</span>
        </div>
      </div>

      <Link to="/" className={classes.newChat}>
        <SidebarButton icon={<SquarePen size={20} />}>Новый чат</SidebarButton>
      </Link>

      <span className={classes.recent}>Недавнее</span>

      {chats.data && (
        <div className={classes.chatList}>
          {chats.data.map((chat) => (
            <ChatCard key={chat.id} chat={chat} />
          ))}
        </div>
      )}

      <div className={classes.bottom}>
        {currentUser.role !== 'student' && (
          <Link to="/panel">
            <SidebarButton icon={<Settings size={20} />}>Панель управления</SidebarButton>
          </Link>
        )}

        <SidebarButton onClick={() => logout()} showLoader={isPending} icon={<LogOut size={20} />}>
          Выйти
        </SidebarButton>

        <div className={classes.user}>
          <User size={20} />

          <div className={classes.userInfo}>
            <b className={classes.username}>
              {currentUser.surname} {currentUser.name}
            </b>
            <span className={classes.tokens}>
              {currentUser.username} | {currentUser.tokens} токенов
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
