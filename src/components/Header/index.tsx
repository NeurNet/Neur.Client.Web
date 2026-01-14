import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import classes from './Header.module.scss';

function Header() {
  const { authUser, isLoading } = useAuth();

  return (
    <header className={classes.header}>
      <Link to="/" className="link">
        <h1>{import.meta.env.VITE_NAME}</h1>
      </Link>

      {isLoading ? (
        <span>Загрузка...</span>
      ) : (
        authUser && (
          <div className={classes.userInfo}>
            <b>{authUser.tokens} токенов</b>
            <Link to="/settings" className="link">
              {authUser.username}
            </Link>
          </div>
        )
      )}
    </header>
  );
}

export default Header;
