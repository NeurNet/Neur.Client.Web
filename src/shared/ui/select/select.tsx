import { ChevronDown } from 'lucide-react';
import classes from './select.module.css';
import clsx from 'clsx';

export function Select({ className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={clsx(classes.wrapper, className)}>
      <ChevronDown size={14} className={classes.chevron} />
      <select className={classes.select} {...props} />
    </div>
  );
}
