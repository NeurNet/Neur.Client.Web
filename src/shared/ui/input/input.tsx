import clsx from 'clsx';
import classes from './input.module.css';
import { CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  destructive?: boolean;
}

export function Input({ destructive = false, className, disabled, ...props }: InputProps) {
  return (
    <label
      className={clsx(
        classes.wrapper,
        destructive && classes.destructive,
        disabled && classes.disabled,
        className,
      )}
    >
      <input className={classes.input} disabled={disabled} {...props} />

      {destructive && <CircleAlert className={classes.icon} size={18} />}
    </label>
  );
}
