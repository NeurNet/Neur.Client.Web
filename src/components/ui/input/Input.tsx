import clsx from 'clsx';
import classes from './Input.module.css';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={clsx(className, classes.input)} {...props} />;
}
