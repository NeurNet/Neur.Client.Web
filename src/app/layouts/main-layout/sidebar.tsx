import classes from './sidebar.module.css';
import logo from '@/shared/assets/logo.png';
import { SidebarButton } from './sidebar-button';
import { Box, LogOut, SquarePen, User } from 'lucide-react';
import { Link } from 'react-router';

export function Sidebar() {
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

      <span className={classes.recentsText}>Недавнее</span>

      <div className={classes.recents}></div>

      <div className={classes.bottom}>
        <Link to="/dashboard">
          <SidebarButton icon={<Box size={18} />}>Панель управления</SidebarButton>
        </Link>

        <SidebarButton icon={<LogOut size={18} />}>Выйти</SidebarButton>

        <SidebarButton icon={<User size={18} />}>
          <div>
            <span className={classes.userName}>Лихачев Лев</span>
            <span className={classes.userInfo}>i24s0277 | Администратор</span>
          </div>
        </SidebarButton>
      </div>
    </aside>
  );
}
