import { Outlet } from 'react-router-dom';
import classes from './HeaderLayout.module.scss';
import Header from '../Header';

function HeaderLayout() {
  return (
    <div>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default HeaderLayout;
