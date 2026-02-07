import classes from './Button.module.css';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ isLoading = false, children, ...props }: ButtonProps) {
  return (
    <button className={classes.button} disabled={isLoading || props.disabled}>
      {isLoading && <Loader2 className={classes.loader} size={20} />}
      {children}
    </button>
  );
}
