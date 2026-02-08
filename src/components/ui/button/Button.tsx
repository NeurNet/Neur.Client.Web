import classes from './Button.module.css';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ isLoading, className, disabled, children, ...props }: ButtonProps) {
  return (
    <button className={clsx(classes.button, className)} disabled={isLoading || disabled} {...props}>
      {isLoading && <Loader2 className={classes.loader} size={20} />}
      {children}
    </button>
  );
}
