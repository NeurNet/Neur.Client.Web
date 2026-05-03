import clsx from 'clsx';
import classes from './input.module.css';
import { CircleAlert } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  failed?: boolean;
}

export function Input({ failed = false, className, disabled, ...props }: InputProps) {
  return (
    <label
      className={clsx(
        classes.wrapper,
        failed && classes.failed,
        disabled && classes.disabled,
        className,
      )}
    >
      <input className={classes.input} disabled={disabled} {...props} />

      {failed && <CircleAlert className={classes.icon} size={18} />}
    </label>
  );
}
