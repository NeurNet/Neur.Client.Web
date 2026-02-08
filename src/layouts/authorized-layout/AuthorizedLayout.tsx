import { Link, Navigate, Outlet } from 'react-router';
import { LogOut } from 'lucide-react';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { SidebarButton } from '@/components/ui/SidebarButton';
import type { Role } from '@/api/user';
import classes from './AuthorizedLayout.module.css';

export function AuthorizedLayout({ minimumRole = 'teacher' }: { minimumRole: Role }) {
  const { currentUser, isLoading } = useCurrentUser();

  const roleToNumber = (role: Role) => {
    switch (role) {
      case 'student':
        return 0;
      case 'teacher':
        return 1;
      case 'admin':
        return 2;
    }
  };

  if (isLoading) return <span>Loading...</span>;
  if (!currentUser || roleToNumber(currentUser.role) < roleToNumber(minimumRole)) {
    return <Navigate to="/login" replace />;
  }

  const APP_NAME = import.meta.env.VITE_APP_NAME;

  return (
    <div className={classes.container}>
      <nav className={classes.sidebar}>
        <Link to="/" className={classes.logos}>
          <span>{APP_NAME}</span>
          <span>НейроХаб</span>
        </Link>

        <SidebarButton variant="danger" className={classes.exit}>
          <LogOut size={20} />
          Выйти
        </SidebarButton>
      </nav>

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
