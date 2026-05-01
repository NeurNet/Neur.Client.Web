import classes from './dashboard-layout.module.css';
import { Button } from '@/shared/ui/button';
import { Link, Outlet } from 'react-router';

export function DashboardLayout() {
  return (
    <div>
      <div className={classes.header}>
        <h1 className={classes.title}>Панель управления</h1>

        <nav className={classes.nav}>
          <Link to="/dashboard">
            <Button variant="outline">Обзор</Button>
          </Link>

          <Link to="/dashboard/users">
            <Button variant="outline">Пользователи</Button>
          </Link>

          <Link to="/dashboard/requests">
            <Button variant="outline">История запросов</Button>
          </Link>

          <Link to="/dashboard/models">
            <Button variant="outline">Модели</Button>
          </Link>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
