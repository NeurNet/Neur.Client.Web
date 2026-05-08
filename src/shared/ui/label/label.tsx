import classes from './label.module.css';
import clsx from 'clsx';

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={clsx(classes.label, className)} {...props} />;
}
