import { Link, useLocation } from 'react-router';
import classes from './nav-button.module.css';
import clsx from 'clsx';

interface NavButtonProps {
  children: React.ReactNode;
  to: string;
}

export function NavButton({ children, to }: NavButtonProps) {
  const { pathname } = useLocation();

  return (
    <Link to={to}>
      <button className={clsx(classes.button, pathname === to && classes.active)}>
        {children}
      </button>
    </Link>
  );
}
