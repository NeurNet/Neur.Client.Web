import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import classes from './Header.module.css';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className={classes.header}>
      <div className={classes.logos}>
        <Link to="/">
          <img
            src="https://it-college.ru/images/Logo5.png"
            alt="Логотип Колледжа Цифровых Технологий"
            width={48}
          />
        </Link>

        <div className={classes.texts}>
          <span className={classes.college}>Колледж Цифровых Технологий</span>
          <span className={classes.hub}>НейроХаб</span>
        </div>
      </div>

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
