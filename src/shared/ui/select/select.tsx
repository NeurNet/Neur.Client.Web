import clsx from 'clsx';
import classes from './select.module.css';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={clsx(classes.select, className)} {...props} />;
}
