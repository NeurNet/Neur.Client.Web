import classes from './admin-layout.module.css';
import { Navigate, Outlet } from 'react-router';
import { NavButton } from './nav-button';
import { useSession } from '@/entities/session';

export function AdminLayout() {
  const session = useSession();

  if (session.isPending) return null;
  if (session.error) return <span>{session.error.message}</span>;

  if (session.data.role === 'student') return <Navigate to="/" replace />;

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.title}>Панель управления</h1>

        <nav className={classes.nav}>
          <NavButton to="/admin/overview">Обзор</NavButton>
          <NavButton to="/admin/users">Пользователи</NavButton>
          {session.data.role === 'admin' && (
            <>
              <NavButton to="/admin/requests">История запросов</NavButton>
              <NavButton to="/admin/models">Модели</NavButton>
            </>
          )}
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
