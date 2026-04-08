import clsx from 'clsx';
import classes from './Button.module.css';

export function Button({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={clsx(className, classes.button)} {...props} />;
}
