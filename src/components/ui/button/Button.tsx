import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import classes from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'default' | 'ghost';
}

export function Button({ children, loading, variant = 'default', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(classes.button, {
        [classes.default]: variant === 'default',
        [classes.ghost]: variant === 'ghost',
      })}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 size={18} className={classes.loader} />}
      {children}
    </button>
  );
}
