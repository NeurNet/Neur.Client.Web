import clsx from 'clsx';
import classes from './input.module.css';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(classes.input, className)} {...props} />;
}
