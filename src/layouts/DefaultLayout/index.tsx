import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import classes from './DefaultLayout.module.scss';

function DefaultLayout() {
  const { authUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser && !isLoading) {
      void navigate('/login');
    }
  }, [authUser, navigate, isLoading]);

  return (
    <div>
      <Header />

      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default DefaultLayout;
