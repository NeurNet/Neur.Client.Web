import classes from './dashboard-layout.module.css';
import { Link, Outlet, useLocation } from 'react-router';
import { useAuth } from '@/features/auth';
import { Button } from '@/shared/ui/button';

interface Link {
  name: string;
  path: string;
  role: 'teacher' | 'admin';
}

const links: Link[] = [
  { name: 'Обзор', path: '/dashboard', role: 'teacher' },
  { name: 'Пользователи', path: '/dashboard/users', role: 'teacher' },
  { name: 'История запросов', path: '/dashboard/requests', role: 'teacher' },
  { name: 'Модели', path: '/dashboard/models', role: 'admin' },
];

export function DashboardLayout() {
  const { pathname } = useLocation();
  const { data: auth } = useAuth();

  const visibleLinks = links.filter((link) => auth?.role === 'admin' || auth?.role === link.role);

  if (!auth) return null;

  return (
    <div>
      <div className={classes.header}>
        <h1 className={classes.title}>Панель управления</h1>

        <nav className={classes.nav}>
          {visibleLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Button variant="outline" size="sm" active={pathname === link.path}>
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
