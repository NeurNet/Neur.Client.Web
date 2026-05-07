import clsx from 'clsx';
import classes from './tag.module.css';

type TagVariant = 'success' | 'error';

interface TagProps {
  children?: React.ReactNode;
  variant?: TagVariant;
}

export function Tag({ children, variant = 'success' }: TagProps) {
  return (
    <div className={clsx(classes.tag, classes[variant])}>
      <div className={classes.circle} />
      <span>{children}</span>
    </div>
  );
}
