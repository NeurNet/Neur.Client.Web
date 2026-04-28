import classes from './sidebar.module.css';
import logo from '@/shared/assets/logo.png';
import { Link } from 'react-router';
import { SidebarButton } from './sidebar-button';
import { Box, LogOut, SquarePen, User } from 'lucide-react';
import { mapUserRole, useAuth, useLogout } from '@/features/auth';
import { relativeDate } from '@/shared/lib';
import { useChats } from '@/entities/chat';

export function Sidebar() {
  const auth = useAuth();
  const chats = useChats();

  const logoutMutation = useLogout();

  return (
    <aside className={classes.sidebar}>
      <div className={classes.logo}>
        <img src={logo} alt="NeurNet Logo" width={56} />

        <div>
          <span className={classes.title}>NeurNet</span>
          <span className={classes.description}>Нейросети колледжа</span>
        </div>
      </div>

      <Link to="/">
        <SidebarButton icon={<SquarePen size={18} />}>Новый чат</SidebarButton>
      </Link>

      <span className={classes.recentText}>Недавнее</span>

      {chats.data && (
        <div className={classes.recentChats}>
          {chats.data.map((chat) => (
            <SidebarButton key={chat.id} label={relativeDate(new Date(chat.created_at), 'ru')}>
              {chat.model_name}
            </SidebarButton>
          ))}
        </div>
      )}

      {auth.data && (
        <div className={classes.bottom}>
          {auth.data.role !== 'student' && (
            <Link to="/dashboard">
              <SidebarButton icon={<Box size={18} />}>Панель управления</SidebarButton>
            </Link>
          )}

          <SidebarButton icon={<LogOut size={18} />} onClick={() => logoutMutation.mutate()}>
            Выйти
          </SidebarButton>

          <SidebarButton icon={<User size={18} />}>
            <div>
              <span className={classes.userName}>
                {auth.data.surname} {auth.data.name}
              </span>
              <span className={classes.userInfo}>
                {auth.data.username} | {mapUserRole(auth.data.role)}
              </span>
            </div>
          </SidebarButton>
        </div>
      )}
    </aside>
  );
}
