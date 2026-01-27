import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/contexts/AuthContext';
import { FullScreenLoader } from '../FullScreenLoader';
import { Header } from '../Header';
import classes from './Layout.module.css';

export function Layout() {
  const { user, loading } = useAuth();

  if (loading) return <FullScreenLoader />
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className={classes.container}>
      <Header />

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
