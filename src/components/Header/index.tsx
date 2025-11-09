import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import classes from './Header.module.scss';

function Header() {
  const { user, isLoading } = useAuth();

  return (
    <header className={classes.header}>
      <Link to="/" className="link">
        <h1>{import.meta.env.VITE_NAME}</h1>
      </Link>

      {isLoading ? (
        <span>Загрузка...</span>
      ) : user ? (
        <div className={classes.userInfo}>
          <b>{user.tokens} токенов</b>
          <Link to="/settings" className="link">
            {user.username}
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <button className="button">Войти</button>
        </Link>
      )}
    </header>
  );
}

export default Header;
