import classes from './main-layout.module.css';
import { Navigate, Outlet } from 'react-router';
import { Sidebar } from './sidebar';
import { useAuth } from '@/features/auth';

export function MainLayout() {
  const auth = useAuth();

  if (!auth.isLoading && !auth.data) return <Navigate to="/login" replace />;

  return (
    <div className={classes.wrapper}>
      <Sidebar />

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
