import classes from './main-layout.module.css';
import { useSession } from '@/features/auth';
import { Sidebar } from '@/widgets/sidebar';
import { Navigate, Outlet } from 'react-router';

export function MainLayout() {
  const session = useSession();

  if (session.isPending) return null;
  if (!session.data) return <Navigate to="/login" replace />;

  return (
    <div className={classes.wrapper}>
      <Sidebar />

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
