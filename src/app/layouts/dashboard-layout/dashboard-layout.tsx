import classes from './dashboard-layout.module.css';
import { Button } from '@/shared/ui/button';
import { Link, Outlet, useLocation } from 'react-router';

const links = [
  { name: 'Обзор', path: '/dashboard' },
  { name: 'Пользователи', path: '/dashboard/users' },
  { name: 'История запросов', path: '/dashboard/requests' },
  { name: 'Модели', path: '/dashboard/models' },
];

export function DashboardLayout() {
  const { pathname } = useLocation();

  return (
    <div>
      <div className={classes.header}>
        <h1 className={classes.title}>Панель управления</h1>

        <nav className={classes.nav}>
          {links.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button variant="outline" active={pathname === link.path}>
                {link.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
