import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import classes from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'default' | 'ghost';
  size?: 'default' | 'icon';
}

export function Button({
  children,
  loading,
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(classes.button, {
        [classes.defaultVariant]: variant === 'default',
        [classes.ghost]: variant === 'ghost',
        [classes.defaultSize]: size === 'default',
        [classes.icon]: size === 'icon',
        className,
      })}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 size={18} className={classes.loader} />}
      {children}
    </button>
  );
}
