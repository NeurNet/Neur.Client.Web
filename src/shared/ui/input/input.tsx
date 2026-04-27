import clsx from 'clsx';
import classes from './input.module.css';
import { CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({ error = false, className, disabled, ...props }: InputProps) {
  return (
    <label
      className={clsx(
        classes.wrapper,
        error && classes.error,
        disabled && classes.disabled,
        className,
      )}
    >
      <input className={classes.input} disabled={disabled} {...props} />

      {error && <CircleAlert className={classes.icon} size={18} />}
    </label>
  );
}
