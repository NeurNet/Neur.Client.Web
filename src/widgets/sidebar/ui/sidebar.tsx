import classes from './sidebar.module.css';
import logo from '@/shared/assets/logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { SidebarButton } from './sidebar-button';
import { Box, LogOut, SquarePen, User } from 'lucide-react';
import { mapUserRole, useAuth, useLogout } from '@/features/auth';
import { relativeDate } from '@/shared/lib';
import { useChats } from '@/features/chat';
import { ProfileDialog } from '@/features/view-profile';

export function Sidebar() {
  const auth = useAuth();
  const chats = useChats();

  const logoutMutation = useLogout();

  const { pathname } = useLocation();

  const [showProfileDialog, setShowProfileDialog] = useState(false);

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
        <SidebarButton icon={<SquarePen size={18} />} active={pathname === '/'}>
          Новый чат
        </SidebarButton>
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
              <SidebarButton icon={<Box size={18} />} active={pathname === '/dashboard'}>
                Панель управления
              </SidebarButton>
            </Link>
          )}

          <SidebarButton icon={<LogOut size={18} />} onClick={() => logoutMutation.mutate()}>
            Выйти
          </SidebarButton>

          <SidebarButton icon={<User size={18} />} onClick={() => setShowProfileDialog(true)}>
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

      <ProfileDialog open={showProfileDialog} onClose={() => setShowProfileDialog(false)} />
    </aside>
  );
}
