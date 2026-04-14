import clsx from 'clsx';
import classes from './badge.module.css';

interface TagProps {
  children: React.ReactNode;
  variant: 'success' | 'danger';
}

export function Badge({ children, variant }: TagProps) {
  return (
    <div className={clsx(classes.wrapper, classes[variant])}>
      <div className={classes.dot} />
      <span className={classes.text}>{children}</span>
    </div>
  );
}
