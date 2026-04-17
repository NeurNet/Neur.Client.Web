import clsx from 'clsx';
import classes from './model-badge.module.css';

interface ModelBadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'danger';
}

export function ModelBadge({ children, variant }: ModelBadgeProps) {
  return (
    <div className={clsx(classes.wrapper, classes[variant])}>
      <div className={classes.dot} />
      <span className={classes.text}>{children}</span>
    </div>
  );
}
