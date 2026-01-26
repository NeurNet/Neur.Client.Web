import { Link, useLocation } from 'react-router';
import { ChevronRight, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import classes from './Header.module.css';

export function Header() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logos}>
          <img
            src="https://it-college.ru/images/Logo5.png"
            alt="Логотип Колледжа Цифровых Технологий"
            width={48}
            height={48}
          />

          <div className={classes.texts}>
            <span className={classes.college}>Колледж Цифровых Технологий</span>
            <span className={classes.hub}>НейроХаб</span>
          </div>
        </div>
      </Link>

      {user && (
        <div className={classes.rightSide}>
          {user.role === 'admin' && (
            <Link to="/admin" className="btn-icon">
              <Star size={18} fill={location.pathname === '/admin' ? '#000' : '#fff'} />
            </Link>
          )}

          <Link to="/profile" className={classes.userInfo}>
            <div className={classes.userDetails}>
              <span className={classes.username}>{user.username}</span>
              <span>{user.tokens} токенов</span>
            </div>
            <ChevronRight className={classes.chevron} />
          </Link>
        </div>
      )}
    </header>
  );
}
