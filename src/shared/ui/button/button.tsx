import clsx from 'clsx';
import classes from './button.module.css';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({ size = 'md', variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(classes.button, classes[size], classes[variant], className)}
      {...props}
    />
  );
}
