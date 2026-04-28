import classes from './main-layout.module.css';
import { Outlet } from 'react-router';
import { Sidebar } from './sidebar';

export function MainLayout() {
  return (
    <div className={classes.wrapper}>
      <Sidebar />

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
