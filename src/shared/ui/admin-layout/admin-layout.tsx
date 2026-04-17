import classes from './admin-layout.module.css';
import { Outlet } from 'react-router';
import { NavButton } from './nav-button';

export function AdminLayout() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h1 className={classes.title}>Панель управления</h1>

        <nav className={classes.nav}>
          <NavButton to="/admin/overview">Обзор</NavButton>
          <NavButton to="/admin/users">Пользователи</NavButton>
          <NavButton to="/admin/requests">История запросов</NavButton>
          <NavButton to="/admin/models">Модели</NavButton>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}
