import { Navigate, Outlet } from 'react-router';
import type { Role } from '@/api/user';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { Sidebar } from '@/components/sidebar';
import { Loader } from '@/components/loader';
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

  if (isLoading) return <Loader />;
  if (!currentUser || roleToNumber(currentUser.role) < roleToNumber(minimumRole)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={classes.container}>
      <Sidebar />

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
