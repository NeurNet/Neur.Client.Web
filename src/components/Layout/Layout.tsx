import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import Header from '../Header/Header';
import classes from './Layout.module.css';

export default function Layout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  return (
    <div>
      <Header />

      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
}
