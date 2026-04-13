import classes from './layout.module.css';
import { useSession } from '@/entities/session';
import { Sidebar } from '@/widgets/sidebar';
import { Navigate, Outlet } from 'react-router';

export function Layout() {
  const session = useSession();

  if (session.isPending) return null;
  if (!session.data) return <Navigate to="/signin" replace />;

  return (
    <div className={classes.wrapper}>
      <Sidebar />

      <Outlet />
    </div>
  );
}
