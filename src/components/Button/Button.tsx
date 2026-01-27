import type { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import classes from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function Button({ children, loading, ...props }: ButtonProps) {
  return (
    <button className={classes.button} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 size={18} className={classes.loader} />}
      {children}
    </button>
  );
}
