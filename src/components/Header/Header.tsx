import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import classes from './Header.module.css';

export function Header() {
  const { user } = useAuth();

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logos}>
          <img
            src="https://it-college.ru/images/Logo5.png"
            alt="Логотип Колледжа Цифровых Технологий"
            width={48}
          />

          <div className={classes.texts}>
            <span className={classes.college}>Колледж Цифровых Технологий</span>
            <span className={classes.hub}>НейроХаб</span>
          </div>
        </div>
      </Link>

      {user && (
        <Link to="/profile" className={classes.userInfo}>
          <div className={classes.userDetails}>
            <span className={classes.username}>{user.username}</span>
            <span>{user.tokens} токенов</span>
          </div>
          <ChevronRight className={classes.chevron} />
        </Link>
      )}
    </header>
  );
}
