import clsx from 'clsx';
import classes from './button.module.css';

type ButtonSize = 'icon' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  active?: boolean;
}

export function Button({
  size = 'md',
  variant = 'primary',
  active = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        classes.button,
        classes[size],
        classes[variant],
        active && classes.active,
        className,
      )}
      {...props}
    />
  );
}
