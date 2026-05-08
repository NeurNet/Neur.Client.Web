import classes from './main-layout.module.css';
import { Navigate, Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from '@/widgets/sidebar';
import { useAuth } from '@/features/auth';

export function MainLayout() {
  const auth = useAuth();

  if (auth.isPending) return null;
  if (!auth.data) return <Navigate to="/login" replace />;

  return (
    <div className={classes.wrapper}>
      <Sidebar />

      <main className={classes.main}>
        <Outlet />
      </main>

      <Toaster position="bottom-right" />
    </div>
  );
}
