import classes from './button.module.css';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm' | 'icon';
  selected?: boolean;
}

export function Button({
  className,
  size = 'md',
  variant = 'primary',
  selected = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        classes.button,
        selected && classes.selected,
        classes[size],
        classes[variant],
        className,
      )}
      {...props}
    />
  );
}
