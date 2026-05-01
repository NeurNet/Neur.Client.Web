import classes from './dashboard-layout.module.css';
import { Button } from '@/shared/ui/button';
import { Link, Outlet, useLocation } from 'react-router';

export function DashboardLayout() {
  const { pathname } = useLocation();

  return (
    <div>
      <div className={classes.header}>
        <h1 className={classes.title}>Панель управления</h1>

        <nav className={classes.nav}>
          <Link to="/dashboard">
            <Button variant="outline" active={pathname === '/dashboard'}>
              Обзор
            </Button>
          </Link>

          <Link to="/dashboard/users">
            <Button variant="outline" active={pathname === '/dashboard/users'}>
              Пользователи
            </Button>
          </Link>

          <Link to="/dashboard/requests">
            <Button variant="outline" active={pathname === '/dashboard/requests'}>
              История запросов
            </Button>
          </Link>

          <Link to="/dashboard/models">
            <Button variant="outline" active={pathname === '/dashboard/models'}>
              Модели
            </Button>
          </Link>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
