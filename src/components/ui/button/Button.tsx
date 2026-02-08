import classes from './Button.module.css';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showLoader?: boolean;
  variant?: 'primary' | 'icon';
}

export function Button({
  showLoader,
  className,
  disabled,
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(classes.button, classes[variant], className)}
      disabled={showLoader || disabled}
      {...props}
    >
      {showLoader && <Loader2 className={classes.loader} size={20} />}
      {children}
    </button>
  );
}
