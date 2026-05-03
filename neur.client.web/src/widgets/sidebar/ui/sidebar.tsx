import classes from './sidebar.module.css';
import logo from '@/shared/assets/logo.png';
import { Link, useLocation } from 'react-router';
import { SidebarButton } from './sidebar-button';
import { Box, LogOut, SquarePen, User } from 'lucide-react';
import { mapUserRole, useSession, useLogout } from '@/features/auth';

export function Sidebar() {
  const session = useSession();

  const logoutMutation = useLogout();

  const { pathname } = useLocation();

  if (session.isPending) return null;

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

      {session.data && (
        <div className={classes.bottom}>
          {session.data.role !== 'student' && (
            <Link to="/dashboard">
              <SidebarButton icon={<Box size={18} />} active={pathname === '/dashboard'}>
                Панель управления
              </SidebarButton>
            </Link>
          )}

          <SidebarButton icon={<LogOut size={18} />} onClick={() => logoutMutation.mutate()}>
            Выйти
          </SidebarButton>

          <SidebarButton icon={<User size={18} />}>
            <div>
              <span className={classes.userName}>
                {session.data.surname} {session.data.name}
              </span>
              <span className={classes.userInfo}>
                {session.data.username} | {mapUserRole(session.data.role)}
              </span>
            </div>
          </SidebarButton>
        </div>
      )}
    </aside>
  );
}
