import classes from './Button.module.css';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  showLoader?: boolean;
  size?: 'default' | 'icon';
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button({
  size = 'default',
  variant = 'primary',
  showLoader,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(classes.button, classes[size], classes[variant], className)}
      disabled={showLoader || disabled}
      {...props}
    >
      {showLoader && <Loader2 className={classes.loader} size={20} />}
      {children}
    </button>
  );
}
