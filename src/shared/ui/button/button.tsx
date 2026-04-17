import classes from './button.module.css';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm' | 'icon';
}

export function Button({ className, size = 'md', variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={clsx(classes.button, classes[size], classes[variant], className)}
      {...props}
    />
  );
}
