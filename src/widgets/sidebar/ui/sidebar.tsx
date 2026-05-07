import classes from './sidebar.module.css';
import logo from '@/shared/assets/logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { SidebarButton } from './sidebar-button';
import { Box, ChevronsLeft, ChevronsRight, LogOut, SquarePen, User } from 'lucide-react';
import { useAuth, useLogout, ProfileDialog } from '@/features/auth';
import { useChats } from '@/entities/chat';
import { Button } from '@/shared/ui/button';
import { mapUserRole } from '@/entities/user';
import { ChatButton } from './chat-button';

export function Sidebar() {
  const auth = useAuth();
  const { data: chats } = useChats();

  const reversedChats = chats ? chats.toReversed() : [];

  const logoutMutation = useLogout();

  const { pathname } = useLocation();

  const isMobile = window.innerWidth < 1400;

  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(isMobile);

  const onLinkClick = () => {
    if (isMobile) setSidebarHidden(true);
  };

  return sidebarHidden ? (
    <Button
      size="icon"
      variant="outline"
      className={classes.showButton}
      onClick={() => setSidebarHidden(false)}
    >
      <ChevronsRight />
    </Button>
  ) : (
    <aside className={classes.sidebar}>
      <div className={classes.logo}>
        <img src={logo} alt="NeurNet Logo" width={56} />

        <div>
          <span className={classes.title}>NeurNet</span>
          <span>Нейросети колледжа</span>
        </div>
      </div>

      <Link to="/">
        <SidebarButton
          icon={<SquarePen size={18} />}
          active={pathname === '/'}
          onClick={onLinkClick}
        >
          Новый чат
        </SidebarButton>
      </Link>

      <span className={classes.recentText}>Недавнее</span>

      <div className={classes.recentChats}>
        {reversedChats.map((chat) => (
          <ChatButton key={chat.id} chat={chat} />
        ))}
      </div>

      {auth.data && (
        <div className={classes.bottom}>
          <SidebarButton icon={<ChevronsLeft size={18} />} onClick={() => setSidebarHidden(true)}>
            Скрыть
          </SidebarButton>

          {auth.data.role !== 'student' && (
            <Link to="/dashboard">
              <SidebarButton
                icon={<Box size={18} />}
                active={pathname.startsWith('/dashboard')}
                onClick={onLinkClick}
              >
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

      {showProfileDialog && <ProfileDialog onClose={() => setShowProfileDialog(false)} />}
    </aside>
  );
}
