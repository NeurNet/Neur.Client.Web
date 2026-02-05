import { Navigate, Outlet } from 'react-router';
import type { Role } from '@/api/management';
import { useAuth } from '@/contexts/AuthContext';
import { FullScreenLoader } from '../FullScreenLoader';
import { Header } from '../Header';
import classes from './AuthorizedLayout.module.css';

export function AuthorizedLayout({ role = 'student' }: { role?: Role }) {
  const { user, loading } = useAuth();

  const roleToNumber = (r: Role) => {
    switch (r) {
      case 'student':
        return 0;
      case 'teacher':
        return 1;
      case 'admin':
        return 2;
    }
  };

  if (loading) return <FullScreenLoader />;
  if (!user) return <Navigate to="/login" replace />;

  if (roleToNumber(user.role) < roleToNumber(role)) return <Navigate to="/" replace />;

  return (
    <div className={classes.container}>
      <Header />

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
